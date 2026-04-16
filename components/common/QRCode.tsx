"use client";

interface QRCodeProps {
  value: string;
  size?: number;
}

export function QRCode({ value, size = 200 }: QRCodeProps) {
  return (
    <div className="rounded-lg border p-2">
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <p className="text-xs text-muted-foreground text-center">
          QR Code
          <br />
          {value}
        </p>
      </div>
    </div>
  );
}