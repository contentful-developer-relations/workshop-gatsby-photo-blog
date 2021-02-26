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
