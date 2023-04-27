const Sentry = require("@sentry/node");

class CFSentryImpl {
  SetupSentry(environment: String) {
    Sentry.init({
      dsn: "https://83364972b8c74dcb9ad93deaf4d37460@o4504655937536000.ingest.sentry.io/4505079467016192",

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      AttachStacktrace: true,
      EnableTracing: true,
      Environment: environment,
      Release: "2.0.2",
    });
  }

  CaptureError(api: String, message: String) {
    Sentry.captureMessage(api + "::" + message);
    Sentry.flush(2000);
  }
}

const CFSentry = new CFSentryImpl();
export default CFSentry;
