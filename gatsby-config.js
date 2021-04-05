module.exports = {
  siteMetadata: {
    title: "megfhdev",
  },
  plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/src/content/posts`,
    },
  },
  'gatsby-transformer-remark'
]
};
