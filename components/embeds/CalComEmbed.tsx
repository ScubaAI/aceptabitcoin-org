"use client";

import { useEffect } from "react";

interface CalComEmbedProps {
  username?: string;
  eventSlug?: string;
  className?: string;
}

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function CalComEmbed({ 
  username = "aceptabitcoin", 
  eventSlug = "asesoria-30min", 
  className = "" 
}: CalComEmbedProps) {
  
  useEffect(() => {
    // 🔧 FIX: URL corregida (sin espacio al final)
    (function (C, A, L) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = d.createElement("script");
          script.src = A;
          script.async = true;
          d.head.appendChild(script);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = api;
            p(api, ar);
            return api;
          }
          p(cal, ar);
          return cal;
        }
        p(cal, ar);
      };
    })(window as any, "https://cal.com/embed.js", "init");

    if (window.Cal) {
      window.Cal("init", { origin: "https://cal.com" });
      window.Cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#f7931a" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    }
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
          border: "1px solid rgba(247, 147, 26, 0.2)"
        }}
      />
    </div>
  );
}