// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // --- Validación de Datos (Paso de Seguridad Básico) ---
    const { nombre, email, empresa, desafio } = body;
    if (!nombre || !email || !empresa || !desafio) {
      return NextResponse.json({ message: 'Faltan campos requeridos.' }, { status: 400 });
    }

    // --- Integración con n8n ---
    // Lee la URL del webhook desde las variables de entorno para mayor seguridad.
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Error: La variable de entorno N8N_WEBHOOK_URL no está definida.');
      // No exponer este error al cliente por seguridad.
      return NextResponse.json({ message: 'Error de configuración del servidor.' }, { status: 500 });
    }

    // Envía los datos al webhook de n8n
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      // Si n8n no responde correctamente, registra el error pero no lo expongas al cliente.
      console.error('Error al enviar datos a n8n:', await n8nResponse.text());
      // Puedes decidir si aún así quieres enviar una respuesta de éxito al usuario.
    }

    console.log('Lead enviado a n8n exitosamente:', body.email);
    
    return NextResponse.json({ message: 'Formulario recibido con éxito!' }, { status: 200 });
    
  } catch (error) {
    console.error('Error en el API de contacto:', error);
    return NextResponse.json({ message: 'Error al procesar el formulario.' }, { status: 500 });
  }
}
