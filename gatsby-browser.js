exports.onClientEntry = function (_, pluginParams) {
  require.ensure(['@sentry/react', '@sentry/apm'], function (require) {
    const TracingIntegration = require('@sentry/apm').Integrations.Tracing
    const tracesSampleRate =
      pluginParams.tracesSampleRate !== undefined
        ? pluginParams.tracesSampleRate
        : 0
    const integrations = [...(pluginParams.integrations || [])]
    if (tracesSampleRate) {
      integrations.push(new TracingIntegration())
    }
    Sentry.init({
      ...pluginParams,
      tracesSampleRate,
      integrations,
    })
  })
}
