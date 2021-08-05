---
date: 2021-08-05T02:45:01Z
tags:
- gatsby
- " react "
title: What I Learned from 100 Days of Gatsby

---
Earlier this year I worked my way through the #100DaysOfGatsby challenges. This year's project has been divided into sprints, with each sprint having a new set of features to implement. While I didn't keep up with the schedule exactly (and this blog post is very belated!), I really enjoyed having the project broken down into manageable chunks like this.

I had played with Gatsby a bit previously, but this project really helped me to dive deeper and get comfortable with the Gatsby framework and the wonderful world of Gatsby plugins! In this post I will highlight some of the hiccups I encountered and things I learned along the way.

## [Challenge 1](https://www.gatsbyjs.com/blog/100days-challenge-1)

The first challenge involved a few things to get a Proof of Concept site up and running:

* Use Gatsby’s Contentful plugin and connect to a test Contentful site
* Create the following pages:
  * home
  * about
  * a collection of pages for every city
* Build it on Gatsby Cloud and use their preview URL

The `npm init gatsby` command makes setting up a new site easy, and prompts to choose your preferred CMS, styling tools and additional features. Per the challenge instructions, I selected Contentful as the CMS and configured a few additional plugins (“responsive images”, “sitemap”, and “metatags”).

Since creating a page in Gatsby is as easy as exporting a React component from a page located in the src/pages directory, I created the `src/pages/about.js` to create a route at /about. The "home" page is `src/pages/index.js` which is automatically created by the `npm init gatsby` command. To create the pages for each city, I had to learn something new!

This was my first time using Gatsby's [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/), which allows you to programmatically create pages from your GraphQL data, without touching the `gatsby-node.js` file at all.

For this case, I wanted to create pages for each city that audioC0RE operates in, nested under the `/location/` route.
First, the cities were created as a content type in [Contentful](https://www.contentful.com/):
![contentful dashboard showing the city content type](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cpbj4c4xee8wjv2r0q1b.png)
Since the `gatsby-source-contentful` plugin was already configured, after creating the content model, I could now see the contentfulCity type in the GraphiQL explorer:
![contentfulCity type highlighted in the GraphiQL explorer sidebar](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7rfyfl302qyrk6id77yf.png)

So, to create the city pages, I created a new file, `src/pages/location/{contentfulCity.name}.js`. At build time, Gatsby uses the content within the curly braces to generate GraphQL queries to retrieve the nodes that should be built for this collection (allContentfulCity), and create a page for each of them. In this case, the following query is generated:

```graphql
allContentfulCity {
    nodes {
      id
      name
    }
}
```

Inside the `src/pages/location/{contentfulCity.name}.js` component itself, I used the following query to get all the data needed for each page that is being created:

```graphql
query ($id: String = "") {
    contentfulCity(id: {eq: $id}) {
      name
      description
      coordinates {
        lat
        lon
      }
      skylineImage {
        title
        gatsbyImageData
      }
    }
  }
```

And voila! 3 pages have been created for the 3 cities that are stored in Contentful:

* /location/toronto/
* /location/new-york/
* /location/san-fransisco/

***

## [Challenge 2](https://www.gatsbyjs.com/blog/challenge-2/)

Challenge 2 involved actually getting the website up and running, styling with ChakraUI, adding a contact form with Formium, and adding a skyline image for each city page.

Having never used ChakraUI before (and admittedly rusty on my frontend skills), I had to search for some inspiration. I found this fantastic [blog post](https://raptis.wtf/blog/build-a-landing-page-with-chakra-ui-part-1/) from Jim Raptis, and used it to help me build the home page and header, with a few adjustments.

![audioC0RE landing page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zkanhim0n33shp51aw6u.png)

I wanted to have the header contain links to all cities, but was encountering an error:

```console
Exported queries are only executed for Page components. It's possible you're
trying to create pages in your gatsby-node.js and that's failing for some
reason.

If the failing component(s) is a regular component and not intended to be a page
component, you generally want to use a <StaticQuery> (https://gatsbyjs.org/docs/static-query)
instead of exporting a page query.
```

This led me to discover Gatsby's [<StaticQuery>](https://www.gatsbyjs.com/docs/how-to/querying-data/static-query/)! From the Gatsby docs:

> By using StaticQuery, you can colocate a component with its data. It is no longer required to, say, pass data down from Layout to Header.

That's exactly what I needed it for! So I used the `<StaticQuery>` to populate my header with the links to the cities:

```react
<StaticQuery 
      query={graphql`
        query AllCities {
          allContentfulCity {
            edges {
              node {
                name
                gatsbyPath(filePath: "/location/{contentfulCity.name}")
              }
            }
          }
        }
        `
      }
      render={data => <HeaderComponent data={data} />}
    />
```

**A Hiccup**: When building the dropdown menu for the cities, I was trying to use `ChevronDownIcon` in my <HeaderComponent>, but I was importing it from `@chakra-ui/react` instead of `@chakra-ui/icons`, and the error message was a bit confusing:

```console
Uncaught Error: Undefined component passed to createElement()

You likely forgot to export your component or might have mixed up default and named imports
```

_Lesson_: always double check your imports!

***

## [Challenge 3](https://www.gatsbyjs.com/blog/100days-challenge-3/)

Challenge 3 involved using Gatsby's new [WordPress integration](https://www.gatsbyjs.com/plugins/gatsby-source-wordpress/) to add a blog to the site!

This would involve setting up a `/blog` page, and creating a new page for each blog post sourced from WordPress. The [docs](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/tutorials/building-a-new-site-wordpress-and-gatsby.md#creating-pages-for-each-blog-post-and-linking-to-them) suggest using `gatsby-node.js` and the `createPages` API, but I had a hunch that this wasn't necessary - I could simply use the [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/), as I had with the Contentful cities.

First, I had to setup the `src/pages/blog` page, which would list out all the posts, using the following query:

```graphql
query wpPosts {
    allWpPost(sort: { fields: date, order: DESC}) {
      edges {
        node {
          title
          date
          id
          slug
          excerpt
        }
      }
    }
  }
```

This was used to create a grid of posts excerpts, linking to the actual blog post page:

```react
{data.allWpPost.edges.map(({node:post}) => (
    <Box m="10px" p="10px" grow="1" maxW="400px" key={post.slug}>
        <Link to={'/blog/' + post.slug}>
            <Heading as="h4" size="lg" color="primary.800" mb="1.5" textAlign="center">
                {post.title}
            </Heading>
            <Text dangerouslySetInnerHTML={{ __html: post.excerpt }} isTruncated="true">
            </Text>
          </Link>
      </Box>
))}
```

Next, I created the collection route & template for the actual blog post itself, at `src/pages/blog/{wpPost.slug}.js`, which uses the following query:

```graphql
query ($id: String = "") {
    wpPost(id: {eq: $id}) {
      title
      date(formatString: "DD MMMM, YYYY")
      content
      slug
      id
    }
  }
```

This would create a page for each blog post, which were already linked from the `/blog` page! Fantastic!

***

## [Challenge 4](https://www.gatsbyjs.com/blog/100days-challenge-4/)

Challenge 4 involved setting up a Shopify e-commerce store to sell swag for the popular fictional startup, audioC0RE!

So, I setup a Shopify developer account, installed the necessary plugin and configured everything according to the [docs](https://github.com/gatsbyjs/gatsby-source-shopify). Unfortunately, I encountered an error:
![alt text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gruto9tq2w7jrlbtx7ku.png)

Hmm...that's not very helpful, is it? I searched everywhere, asked twitter and couldn't find anything! So, I opened an [issue](https://github.com/gatsbyjs/gatsby-source-shopify/issues/108#event-4518155849) on Github! This was my first time opening an issue, so I was a little intimidated, but thankfully the maintainer was incredibly nice and helpful! After lots of back and forth, I eventually determined the source of the error: a typo 🤦

I had trailing commas in my `.env` file, which were causing the unauthenticated error because it was adding an extra character to the API key! I felt a little foolish for missing this, but ultimately I'm glad for it! I had a great first issue experience, and it resulted in some additional logging being added to the plugin, which will hopefully help other developers to debug their own issues faster!

After getting that issue sorted out, setting up the `/shop` page went smoothly. I was able to use the [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) again, with a `src/pages/shop/{shopifyProduct.handle.}js` to create the individual pages for each product, and had a listing of all products on the `/src/pages/shop.js` page.

I'll spare you the details once again, but if you want to see the code feel free to look through the [repo](https://github.com/megfh/100daysofgatsby2021)!

## Conclusion

Ultimately, the #100DaysOfGatsby challenge was a great experience! I was able to add a new project to my resume, learn some new things, and I now feel more confident working with both React & Gatsby.

I highly recommend anyone who is interested in learning Gatsby give this challenge a try!