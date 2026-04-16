"use client";

interface CalComEmbedProps {
  calLink?: string;
}

export function CalComEmbed({ calLink }: CalComEmbedProps) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-center text-muted-foreground">
        Calendly embed: {calLink}
      </p>
    </div>
  );
}