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
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `projects`,
      path: `${__dirname}/src/projects`,
  },
  },
  'gatsby-transformer-remark', 
  `gatsby-plugin-react-helmet`
]
};
