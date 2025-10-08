# Configuración del Formulario de Contacto

El formulario de contacto usa **Resend** para enviar emails. Sigue estos pasos para configurarlo:

## 1. Crear cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita (100 emails/día, 3000/mes)

## 2. Obtener API Key

1. Inicia sesión en Resend
2. Ve a **API Keys** en el panel
3. Haz clic en **Create API Key**
4. Dale un nombre (ej: "Portfolio")
5. Copia la API key generada

## 3. Configurar variables de entorno

### Para desarrollo local:

1. Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   cp .env.example .env
   ```

2. Pega tu API key y tu email en el archivo `.env`:
   ```
   RESEND_API_KEY=re_tu_api_key_aqui
   CONTACT_EMAIL=tu-email@ejemplo.com
   ```

### Para producción (Vercel):

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** > **Environment Variables**
3. Agrega las siguientes variables:

   **Variable 1:**
   - **Name**: `RESEND_API_KEY`
   - **Value**: tu API key de Resend
   - **Environment**: Production, Preview, Development

   **Variable 2:**
   - **Name**: `CONTACT_EMAIL`
   - **Value**: tu-email@ejemplo.com
   - **Environment**: Production, Preview, Development

4. Guarda y redeploy

## 4. (Opcional) Configurar dominio personalizado

Por defecto, Resend usa `onboarding@resend.dev` como remitente. Para usar tu propio dominio:

1. Ve a **Domains** en Resend
2. Agrega tu dominio
3. Configura los registros DNS (MX, SPF, DKIM)
4. Una vez verificado, actualiza la línea 41 en `src/pages/api/contact.ts`:
   ```typescript
   from: 'Portfolio <contacto@tudominio.com>',
   ```

## 5. Probar

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el sitio en el navegador
3. Haz clic en el botón "Contacto"
4. Completa y envía el formulario
5. Verifica que recibas el email

## Notas

- El plan gratuito de Resend incluye 100 emails/día
- Los emails se envían desde `onboarding@resend.dev` (o tu dominio si lo configuras)
- El campo `replyTo` se configura con el email del usuario para que puedas responder directamente
- El formulario incluye validación client-side y server-side

## Solución de problemas

### "Error al enviar el mensaje"

- Verifica que la API key esté correctamente configurada
- Revisa los logs de Vercel o la consola del navegador
- Asegúrate de que el plan de Resend no haya alcanzado el límite

### El modal no se abre

- Verifica que el script de `ContactModal.astro` se esté ejecutando
- Revisa la consola del navegador para errores de JavaScript

### Los emails no llegan

- Verifica la bandeja de spam
- Confirma que el email de destino esté correcto en `contact.ts`
- Revisa el dashboard de Resend para ver si los emails se están enviando
