module.exports = {
  siteMetadata: {
    title: "megfhdev",
  },
  plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `blog`,
      path: `${__dirname}/src/content/posts`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `page`,
      path: `${__dirname}/src/pages`,
    },
  },
  'gatsby-transformer-remark', 
  `gatsby-plugin-react-helmet`
]
};
