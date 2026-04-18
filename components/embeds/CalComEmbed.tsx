"use client";

import { useEffect } from "react";

interface CalComEmbedProps {
  username?: string;
  eventSlug?: string;
  className?: string;
}

export default function CalComEmbed({ 
  username = "aceptabitcoin", 
  eventSlug = "asesoria-30min", 
  className = "" 
}: CalComEmbedProps) {
  
  useEffect(() => {
    // Cargar el script de Cal.com solo una vez
    const script = document.createElement("script");
    script.src = "https://cal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`calcom-embed ${className}`}>
      <div 
        className="calcom-embed"
        data-cal-link={`${username}/${eventSlug}`}
        data-cal-config='{"layout":"month_view","theme":"dark"}'
        style={{
          width: "100%",
          height: "750px",
          overflow: "hidden",
          borderRadius: "16px",
          border: "1px solid rgba(0, 196, 180, 0.2)"
        }}
      />
    </div>
  );
}