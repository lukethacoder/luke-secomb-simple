require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const isProduction = process.env.NODE_ENV === 'production'

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
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        clarity_project_id: process.env.GATSBY_CLARITY_ANALYTICS_TRACKING_CODE,
        enable_on_dev_env: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_CODE],
      },
    },
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: isProduction
          ? process.env.GATSBY_GOAT_COUNTER_CODE
          : process.env.GATSBY_GOAT_COUNTER_CODE_DEV,

        exclude: [],
        head: false,
        pixel: true,
        allowLocal: true,
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
