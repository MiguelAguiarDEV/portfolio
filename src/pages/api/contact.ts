import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verificar que las variables de entorno estén disponibles
    const apiKey = import.meta.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('RESEND_API_KEY no está configurado en las variables de entorno');
      return new Response(
        JSON.stringify({ error: 'Configuración del servidor incompleta' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const { name, email, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar longitud
    if (name.length > 100 || message.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Los datos exceden la longitud máxima' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener email de destino desde variables de entorno
    const toEmail = import.meta.env.CONTACT_EMAIL;

    if (!toEmail) {
      console.error('CONTACT_EMAIL no está configurado en las variables de entorno');
      return new Response(
        JSON.stringify({ error: 'Configuración del servidor incompleta' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email 1: Notificación para ti
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Cambia esto cuando configures tu dominio
      to: [toEmail],
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje desde tu portfolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (notificationError) {
      console.error('Resend error (notification):', notificationError);
      return new Response(
        JSON.stringify({ error: 'Error al enviar el mensaje' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email 2: Confirmación para el usuario que te contacta
    const { error: confirmationError } = await resend.emails.send({
      from: 'Miguel Santiesteban <onboarding@resend.dev>', // Cambia esto cuando configures tu dominio
      to: [email],
      subject: 'Gracias por contactarme / Thanks for contacting me',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">¡Gracias por contactarme! / Thanks for reaching out!</h2>

          <p><strong>ES:</strong> He recibido tu mensaje y te responderé lo antes posible.</p>
          <p><strong>EN:</strong> I've received your message and will get back to you as soon as possible.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;"><strong>Tu mensaje / Your message:</strong></p>
            <p style="margin: 10px 0 0 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <p style="color: #666; font-size: 14px;">
            <strong>ES:</strong> Si no enviaste este mensaje, puedes ignorar este email.<br>
            <strong>EN:</strong> If you didn't send this message, you can ignore this email.
          </p>
        </div>
      `,
    });

    // No fallar si el email de confirmación falla (opcional)
    if (confirmationError) {
      console.warn('Error enviando email de confirmación:', confirmationError);
      // Continuar de todos modos, el mensaje principal se envió
    }

    return new Response(
      JSON.stringify({ success: true, id: notificationData?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en endpoint de contacto:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
