const path = require(`path`)

const SENTRY_RELEASE = JSON.stringify(
  // GitHub Actions - https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
  process.env.GITHUB_SHA ||
    // Netlify - https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
    process.env.COMMIT_REF ||
    // Vercel - https://vercel.com/docs/v2/build-step#system-environment-variables
    process.env.VERCEL_GITHUB_COMMIT_SHA ||
    // Zeit (now known as Vercel)
    process.env.ZEIT_GITHUB_COMMIT_SHA ||
    ''
)

exports.onCreateWebpackConfig = ({ plugins, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
      plugins.define({
        __SENTRY_RELEASE__: SENTRY_RELEASE,
        __SENTRY_DSN__: JSON.stringify(process.env.SENTRY_DSN || ''),
      }),
    ],
  })
}
