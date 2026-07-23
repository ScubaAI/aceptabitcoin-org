"use server";

import { Resend } from "resend";
import React from "react";

// 1. Inicialización segura (asegúrate de tener RESEND_API_KEY en tu .env)
const resend = new Resend(process.env.RESEND_API_KEY);

// 2. Interfaces estrictas (Adiós al 'any')
export interface OnboardingFormData {
  name: string;
  email: string;
  businessName: string;
  techLevel: string;
}

// 3. Validación robusta
function validateOnboardingData(data: OnboardingFormData): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return "El nombre es requerido (mínimo 2 caracteres).";
  }
  if (!data.businessName || data.businessName.trim().length < 2) {
    return "El nombre del negocio es requerido.";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return "Se requiere un formato de correo electrónico válido.";
  }
  
  if (!data.techLevel) {
    return "Se requiere seleccionar un nivel técnico.";
  }
  
  return null; // null significa que es válido
}

// 4. Server Action principal
export async function submitOnboarding(formData: FormData) {
  // Extraer y tipar datos
  const rawData: OnboardingFormData = {
    name: (formData.get("name") as string)?.trim() || "",
    email: (formData.get("email") as string)?.trim() || "",
    businessName: (formData.get("businessName") as string)?.trim() || "",
    techLevel: (formData.get("techLevel") as string)?.trim() || "",
  };

  // Validar
  const validationError = validateOnboardingData(rawData);
  if (validationError) {
    return { error: validationError };
  }

  try {
    // Enviar correo
    const { data, error } = await resend.emails.send({
      // ⚠️ CRÍTICO: 'tu-dominio.com' DEBE estar verificado en el dashboard de Resend
      from: "Acepta Bitcoin Oracle <onboarding@tu-dominio.com>", 
      to: ["hola@aceptabitcoin.org"], // Tu correo de administración
      subject: `🟢 [ORACLE] Nuevo Merchant: ${rawData.businessName}`,
      react: <OracleEmailTemplate data={rawData} />,
    });

    if (error) {
      console.error("[ORACLE ERROR] Resend API failed:", error);
      return { error: "Error al procesar la solicitud. Inténtalo de nuevo." };
    }

    console.log("[ORACLE SUCCESS] Onboarding email sent:", data?.id);
    return { success: true };

  } catch (error) {
    console.error("[ORACLE CRITICAL] Server action exception:", error);
    return { error: "Error interno del servidor. El equipo ha sido notificado." };
  }
}

// 5. Componente de Email con estética "Terminal / Oracle System"
// Nota: Los clientes de correo requieren estilos en línea (inline styles).
const OracleEmailTemplate = ({ data }: { data: OnboardingFormData }) => (
  <div style={{ 
    fontFamily: "'Fira Code', 'Courier New', monospace", 
    backgroundColor: "#000000", 
    color: "#00FF41", 
    padding: "24px", 
    border: "1px solid #00FF41",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto"
  }}>
    <div style={{ borderBottom: "1px solid #00FF41", paddingBottom: "16px", marginBottom: "16px" }}>
      <h1 style={{ fontSize: "18px", fontWeight: "bold", margin: 0, letterSpacing: "1px" }}>
        &gt; NUEVA SOLICITUD DE ONBOARDING DETECTADA
      </h1>
      <p style={{ fontSize: "12px", color: "#00CC33", margin: "8px 0 0 0" }}>
        TIMESTAMP: {new Date().toISOString()}
      </p>
    </div>

    <div style={{ lineHeight: "1.6", fontSize: "14px" }}>
      <p style={{ margin: "8px 0" }}><strong style={{ color: "#FAFAFA" }}>OPERADOR:</strong> {data.name}</p>
      <p style={{ margin: "8px 0" }}><strong style={{ color: "#FAFAFA" }}>NODO (NEGOCIO):</strong> {data.businessName}</p>
      <p style={{ margin: "8px 0" }}><strong style={{ color: "#FAFAFA" }}>CANAL DE CONTACTO:</strong> <a href={`mailto:${data.email}`} style={{ color: "#F7931A", textDecoration: "none" }}>{data.email}</a></p>
      <p style={{ margin: "8px 0" }}><strong style={{ color: "#FAFAFA" }}>NIVEL TÉCNICO:</strong> {data.techLevel}</p>
    </div>

    <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px dashed #00FF41", fontSize: "11px", color: "#666" }}>
      <p style={{ margin: 0 }}>ENVIADO DESDE: ACEPTA BITCOIN ORACLE SYSTEM v3.0</p>
      <p style={{ margin: "4px 0 0 0" }}>NO RESPONDER A ESTE CORREO AUTOMATIZADO.</p>
    </div>
  </div>
);