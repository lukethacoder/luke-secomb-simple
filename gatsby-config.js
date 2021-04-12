module.exports = {
  siteMetadata: {
    title: 'luke-secomb-simple',
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
        trackingId: 'test',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
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
