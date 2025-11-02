import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const apiKey = undefined                              ;
    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurado en las variables de entorno");
      return new Response(
        JSON.stringify({ error: "Configuración del servidor incompleta" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Email inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (name.length > 100 || message.length > 2e3) {
      return new Response(
        JSON.stringify({ error: "Los datos exceden la longitud máxima" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const toEmail = undefined                             ;
    if (!toEmail) {
      console.error("CONTACT_EMAIL no está configurado en las variables de entorno");
      return new Response(
        JSON.stringify({ error: "Configuración del servidor incompleta" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      // Cambia esto cuando configures tu dominio
      to: [toEmail],
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje desde tu portfolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });
    if (notificationError) {
      console.error("Resend error (notification):", notificationError);
      return new Response(
        JSON.stringify({ error: "Error al enviar el mensaje" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const { error: confirmationError } = await resend.emails.send({
      from: "Miguel Santiesteban <onboarding@resend.dev>",
      // Cambia esto cuando configures tu dominio
      to: [email],
      subject: "Gracias por contactarme / Thanks for contacting me",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">¡Gracias por contactarme! / Thanks for reaching out!</h2>

          <p><strong>ES:</strong> He recibido tu mensaje y te responderé lo antes posible.</p>
          <p><strong>EN:</strong> I've received your message and will get back to you as soon as possible.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;"><strong>Tu mensaje / Your message:</strong></p>
            <p style="margin: 10px 0 0 0;">${message.replace(/\n/g, "<br>")}</p>
          </div>

          <p style="color: #666; font-size: 14px;">
            <strong>ES:</strong> Si no enviaste este mensaje, puedes ignorar este email.<br>
            <strong>EN:</strong> If you didn't send this message, you can ignore this email.
          </p>
        </div>
      `
    });
    if (confirmationError) {
      console.warn("Error enviando email de confirmación:", confirmationError);
    }
    return new Response(
      JSON.stringify({ success: true, id: notificationData?.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error en endpoint de contacto:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
