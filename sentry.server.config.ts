import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // ═══ Bitcoin Privacy Philosophy Integration ═══
  // Server-side error monitoring only
  // No user tracking, no PII, only technical error data

  sendDefaultPii: false,
  tracesSampleRate: 0.0,

  beforeSend(event, hint) {
    // Scrub any sensitive server-side data
    if (event.request) {
      delete event.request.headers?.["authorization"];
      delete event.request.headers?.["cookie"];
    }
    // Remove any potential user identifiers
    if (event.user) {
      delete event.user.ip_address;
      delete event.user.id;
      delete event.user.email;
    }
    return event;
  },

  ignoreErrors: [
    "NetworkError",
    "Failed to fetch",
  ],
});
