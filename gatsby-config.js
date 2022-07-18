require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Luke Secomb',
    description:
      "Hi, I'm Luke, Web Developer and Photographic connoisseur. Senior Developer at Deloitte Digital.",
    keywords:
      'luke secomb, developer, salesforce, lightning web components, gatsbyjs, gatsby, javascript',
    socials: [
      {
        icon: 'github',
        url: 'https://github.com/lukethacoder',
        title: 'Github',
      },
      {
        icon: 'instagram',
        url: 'https://www.instagram.com/lukesecomb',
        title: 'Instagram',
      },
      {
        icon: 'linkedIn',
        url: 'https://www.linkedin.com/in/luke-secomb/',
        title: 'LinkedIn',
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: `markdown-content`,
      },
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    // need to wait for the plugin to be available for gatsby v4
    // https://github.com/microsoft/gatsby-plugin-clarity/pull/1
    // {
    //   resolve: `gatsby-plugin-clarity`,
    //   options: {
    //     // String value for your clarity project id
    //     // Project id is found in your clarity dashboard url
    //     // https://clarity.microsoft.com/projects/view/{clarity_project_id}/
    //     clarity_project_id: process.env.GATSBY_CLARITY_ANALYTICS_TRACKING_CODE,
    //     // Boolean value for enabling clarity while developing
    //     // true will enable clarity tracking code on both development and production environments
    //     // false will enable clarity tracking code on production environment only
    //     //
    //     enable_on_dev_env: false,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-mixpanel',
      options: {
        apiToken: process.env.GATSBY_MIXPANEL_API_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_CODE],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Luke Secomb`,
        short_name: `Luke Secomb`,
        start_url: `/`,
        background_color: `#050505`,
        theme_color: `#FFC87F`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
}
