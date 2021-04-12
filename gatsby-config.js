module.exports = {
  siteMetadata: {
    title: 'Luke Secomb',
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_CODE,
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
