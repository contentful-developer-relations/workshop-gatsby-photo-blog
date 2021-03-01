# Gatsby Contentful Photo Blog

> Set up your personal photo blog with markdown, hashtags and pagination with Gatsby & Contentful

![](./screenshot.jpg)

You need a [free Contentful account](https://www.contentful.com/sign-up/) to get started.

# Step 0 - Preparation

1. We will use environment variables to securily store and pass our connection credentials. These will to enable us to use Contentfuls preview feature while development and Contentfuls regular API for production.
1. Install dotenv: `npm i dotenv`
2. Add this to the top of your `gatsby-config.js`

```js
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})
```

# Step 1 - Connect to contentful

1. Create new content delivery tokens via `https://app.contentful.com/spaces/YOUR_SPACE_ID/api/keys`
1. Install our source plugin: `npm i gatsby-source-contentful`
1. Duplicate `.env.example` to `.env.development` & `.env.production`
1. Adjust these files .env files:
   * Both should contain your `Space ID`
   * `.env.development` should use your `Content Preview API - access token`
   * `.env.development` uncomment the line that sets the host to `https://cpa.contentful.com`
   * `.env.production` should use your `Content Delivery API - access token`
1. Enable the `gatsby-source-contentful` plugin in your `gatsby-config.js`

```js
{
  resolve: `gatsby-source-contentful`,
  options: {
    spaceId: process.env.SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    host: process.env.CONTENTFUL_HOST,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  },
},
```

## Step 1b - Starting the server and executing our first GraphQL query.

1. Execute `npm start` and visit `htt`
2. Run your first GraphQL query to see all the posts you just added to Contentful:

```graphql
query MyQuery {
  allContentfulPost {
    nodes {
      title
      slug
      image {
        file {
          fileName
        }
      }
      body {
        body
      }
      hashtags
    }
  }
}
```

In the next step we are going to render these posts on the home page.
