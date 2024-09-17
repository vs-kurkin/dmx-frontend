import * as Sentry from '@sentry/vue'

export default {
  dsn: "https://380008d194b649d13402dd2d88c5a7c4@o4507222107488256.ingest.de.sentry.io/4507222109388880",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
}
