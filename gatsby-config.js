module.exports = {
  siteMetadata: {
    title: 'Luke Secomb | Web Developer / Photographer / Digital Designer',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'luke-secomb-simple',
        short_name: 'lss',
        start_url: '/',
        background_color: '#FFC87F',
        theme_color: '#FFC87F',
        display: 'minimal-ui',
        icon: 'src/images/luke-secomb-logo.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
