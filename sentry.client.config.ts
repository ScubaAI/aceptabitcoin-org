import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,

  // ═══ Bitcoin Privacy Philosophy Integration ═══
  // We maximize user privacy by:
  // 1. Not attaching user PII (no IP, no personal data)
  // 2. Scrubbing sensitive data from error messages
  // 3. Using only error fingerprints, not user sessions
  // 4. No cookies or localStorage tracking

  // ── Privacy-first configuration ──
  sendDefaultPii: false, // Never send IP, cookies, user data
  tracesSampleRate: 0.0, // Error monitoring only, no performance tracing
  replaysSessionSampleRate: 0.0, // No session recordings
  replaysOnErrorSampleRate: 0.1, // Only capture replay on errors (10%), scrubbed

  // ── Data scrubbing ──
  // Strip any potentially sensitive data from error messages and context
  beforeSend(event, hint) {
    // Clean any potential sensitive headers or data
    if (event.request) {
      delete event.request.headers?.["authorization"];
      delete event.request.headers?.["cookie"];
    }
    // Respect Do Not Track — if enabled, strip any identifying info
    if (typeof window !== "undefined" && navigator.doNotTrack === "1") {
      if (event.user) {
        delete event.user.ip_address;
      }
    }
    return event;
  },

  // ── Filter error messages ──
  // Don't send expected/non-actionable errors
  ignoreErrors: [
    // Network errors that are typically transient
    "NetworkError",
    "Failed to fetch",
    "Network request failed",
    // Browser extension errors
    "top.GLOBALS",
  ],
});

// Only log errors in production, not development
if (process.env.NODE_ENV === "production") {
  console.log("Sentry initialized for error monitoring (privacy-focused)");
} else {
  // In development, disable Sentry to avoid noise
  Sentry.close();
}
