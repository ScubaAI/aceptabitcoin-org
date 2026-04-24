"use server"; // Esta línea es MUY importante. Le dice a Next que esto corre en el servidor.

import { Resend } from 'resend';
import React from 'react'; // Para usar JSX en el email

// Inicializamos Resend con tu variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitOnboarding(formData: FormData) {
  // 1. Extraer datos del formulario
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const businessName = formData.get('businessName') as string;
  const techLevel = formData.get('techLevel') as string;

  // 2. (Opcional) Validación simple
  if (!email || !businessName) {
    return { error: "Faltan datos críticos." };
  }

  try {
    // 3. Enviar correo a TI (Admin)
    const { data, error } = await resend.emails.send({
      from: 'Acepta Bitcoin <onboarding@tu-dominio.com>', // Tiene que ser un dominio verificado en Resend
      to: ['hola@aceptabitcoin.org'], // Tu correo real
      subject: `🚀 Nuevo Lead: ${businessName}`,
      react: <EmailTemplate 
        firstName={name} 
        businessName={businessName} 
        techLevel={techLevel}
        email={email} 
      />, // Usamos React para hacer el email bonito
    });

    if (error) {
      return { error: error.message };
    }

    // 4. Retornar éxito al frontend
    return { success: true };

  } catch (error) {
    return { error: "Error interno del servidor." };
  }
}

// Componente visual para el correo (Opcional pero pro)
const EmailTemplate = ({ firstName, businessName, techLevel, email }: any) => (
  <div style={{ fontFamily: 'monospace', color: '#000' }}>
    <h1>Nuevo Merchant Solicita Acceso</h1>
    <p><strong>Nombre:</strong> {firstName}</p>
    <p><strong>Negocio:</strong> {businessName}</p>
    <p><strong>Nivel Técnico:</strong> {techLevel}</p>
    <p><strong>Email:</strong> {email}</p>
    <hr />
    <p style={{ fontSize: '12px', color: '#666' }}>Enviado desde Acepta Bitcoin Oracle System</p>
  </div>
);
