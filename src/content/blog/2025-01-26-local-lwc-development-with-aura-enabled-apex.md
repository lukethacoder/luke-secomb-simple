---
title: 'Local LWC Development with real @AuraEnabled method calls'
slug: local-lwc-development-with-aura-enabled-apex
date: 2025-01-26
description: Call real AuraEnabled apex methods from your local LWC dev server
tags: ['salesforce', 'lwc', 'apex']
---

## Introduction

This article explains how to call real `@AuraEnabled` Apex methods from your local development server. We will use [LWC Garden](https://lwc.garden/?utm_campaign=blog-lukesecomb-digital) as our server of choice. However, this approach can also work within a vanilla LWR setup if required.

Let's begin with an example Apex class to get us started:

```apex
public with sharing class AccountController {

  /**
   * @description Method to fetch Accounts by a list of Ids
   * @param accountIds Account Ids to query for
   * @return List of matching Accounts
   */
  public static List<Account> getAccountsById(Set<Id> accountIds) {
    return accountIds.size() == 0 ? new List<Account>() : [
      SELECT Id, Name
      FROM Account 
      WHERE Id IN :accountIds
    ];
  }

  /**
   * @description Method to fetch Accounts by a list of Names
   * @param accountNames Account Names to query for
   * @return List of matching Accounts
   */
  public static List<Account> getAccountsByName(Set<String> accountNames) {
    return accountIds.size() == 0 ? new List<Account>() : [
      SELECT Id, Name
      FROM Account 
      WHERE Name IN :accountNames
    ];
  }
}
```

## Folder Structure

Here’s a quick look at the folder structure:

```
.
├── __mocks__/
│   └── @salesforce/
│       └── apex/
│           ├── AccountController.js (or the following two files)
│           ├── AccountController.getAccountsById.js
│           └── AccountController.getAccountsByName.js
├── force-app/
│   └── main/
│       └── default/
│           ├── apex/
│           │   └── AccountController.cls
│           └── lwc/
│               └── accountManager/
│                   ├── accountManager.css
│                   ├── accountManager.html
│                   ├── accountManager.js
│                   └── accountManager.js-meta.xml
├── package.json
├── lwr.config.json (or lwc.config.json)
└── sfdx-project.json
```

> Depending on approach, you may only require a single mock file for the Apex class (e.g. `AccountController.js`) instead of one file per method. Checkout the [`@lwc-garden/utils`](https://lwc.garden/packages/apex?utm_campaign=blog-lukesecomb-digital) documentation if you're unsure.

## Configuration

Before diving into calling real `@AuraEnabled` methods, let's review a simpler form of method mocking. Depending on your use case, this might be enough to get you running locally.

We'll focus on the vanilla approach for now, which requires creating a new JavaScript file for each Apex Method. If you'd prefer a single file per Apex class, checkout the [`@lwc-garden/utils`](https://lwc.garden/packages/apex?utm_campaign=blog-lukesecomb-digital) documentation.

lwr.config.json
```json
{
  "modules": [
    {
      "name": "@salesforce/apex/AccountController.getAccountsById",
      "path": "./__mocks__/@salesforce/apex/AccountController.getAccountsById.js"
    },
    {
      "name": "@salesforce/apex/AccountController.getAccountsByName",
      "path": "./__mocks__/@salesforce/apex/AccountController.getAccountsByName.js"
    }
  ]
}
```

This configuration maps standard on-platform imports to your local mock JavaScript files.

## Writing the Apex Mocks

Now we'll configure our mocks:

```js
// ./__mocks__/@salesforce/apex/AccountController.getAccountsById.js
export default function getAccountsById() {
  return [
    {
      Id: "001dL00000jNfdgQAC"
      Name: "Google Inc."
    },
    {
      Id: "001dL00000jOfdhQAC"
      Name: "Google Inc."
    }
  ]
}
```

```js
// ./__mocks__/@salesforce/apex/AccountController.getAccountsByName.js
export default function getAccountsByName() {
  return [
    {
      Id: "001dL00000jNfdgQAC"
      Name: "Google"
    },
    {
      Id: "001dL00000jOfdhQAC"
      Name: "Microsoft"
    }
  ]
}
```

You may choose to add some smarts to your mocks if you wish. Here is an example:

```js
// ./__mocks__/@salesforce/apex/AccountController.getAccountsById.js
const ACCOUNTS = [
  {
    Id: "001dL00000jNfdgQAC"
    Name: "Google"
  },
  {
    Id: "001dL00000jOfdhQAC"
    Name: "Microsoft"
  }
]

export default function getAccountsById({ accountIds }) {
  return ACCOUNTS.filter((item) => accountIds.contains(item.Id))
}
```

## Calling real `@AuraEnabled` Apex Methods

To call real Apex methods, we need a local server to bypass browser-based CORS errors. We'll use [Hono](https://hono.dev/), though other frameworks (e.g., Express, Koa, Fastify) can also work.

### Hono Configuration

To get started install the following packages:

```bash
pnpm add hono @hono/node-server
pnpm add -D @types/node tsx
```

Once installed, add a new entry to your `package.json` `"scripts"` object:

```json
"scripts": {
  "run-server": "tsx watch server.ts"
},
```

Create a `server.ts` file to hold our Hono configuration:

```ts
// server.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'

const app = new Hono()

app.use('/proxy', cors())

app.all('/proxy', async (c) => {
  const url = c.req.query('q')

  const res = await fetch(url, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: c.req.raw.body,
    duplex: 'half',
  })
  const headers = { ...res.headers }
  const newResponse = new Response(res.body, { headers })
  return newResponse
})

const port = 3003
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
```

To run the Hono server, run the `pnpm run-server` command we added above.

To test this is running correctly, open your browser and go to [http://localhost:3003/proxy?q=https://example.com](http://localhost:3003/proxy?q=https://example.com). If you are greeted with some HTML, it means the server is running correctly.

### Editing the Apex Mocks

For these mocks, we'll use the [`@lwc-garden/utils`](https://lwc.garden/packages/utils?utm_campaign=blog-lukesecomb-digital) package to allow us to define all our methods within a single JavaScript file.

```bash
pnpm add @lwc-garden/utils
```

Once installed, we will need to edit our `lwr.config.json` file to tell LWC Garden where to find our apex methods.

lwr.config.json
```json
"hooks": [
  [
    "@lwc-garden/utils/resolvers/apex.ts",
    {
      "paths": ["__mocks__/@salesforce/apex/"]
    }
  ],
]
```

> For more information on `@lwc-garden/utils` configuration, including extra configuration for Static Resources and Custom Labels, checkout the [LWC Garden](https://lwc.garden?utm_campaign=blog-lukesecomb-digital) documentation.

Now that we have our mapping configured, lets create our JavaScript file to call our `@AuraEnabled` apex.

Before we jump in, we'll need to find two things.
1. `SALESFORCE_URL`: This is your Experience Cloud BASE URL. e.g. `https://company--dev.sandbox.my.site.com/mycommunity`
2. `CLASS_NAME_ID`: This is a unique Id that is assigned to each Apex Class. This can be found by inspecting the request payload when calling the method on-platform.


```js
// __mocks__/@salesforce/apex/AccountController.js
const PROXY_BASE_URL = 'http://localhost:3003'
const WEBRUNTIME_URL = '/webruntime/api/apex/execute'

// TODO: REPLACE THIS
const SALESFORCE_URL = `https://company--dev.sandbox.my.site.com/mycommunity`

// TODO: REPLACE THIS
const CLASS_NAME_ID = '@udd/01p8r000008CmFZ'

const BASE_URL = `${PROXY_BASE_URL}/proxy?q=${SALESFORCE_URL}/${WEBRUNTIME_URL}`

const fetchHelper = async (methodName, params, isWire) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append(
    'Cookie',
    'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
  )

  const raw = JSON.stringify(
    {
      namespace: '',
      classname: CLASS_NAME_ID,
      method: methodName,
      isContinuation: false,
      params,
      cacheable: false,
    }
  )

  const response = await fetch(
    `${BASE_URL}?language=en-US&asGuest=true&htmlEncode=false`,
    {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }
  )

  const json = await response.json()

  if (json.cacheable) {
    return {
      data: json.returnValue,
      error: undefined,
    }
  } else {
    return json.returnValue
  }
}

export const getAccountsById = async (params) =>
  fetchHelper('getAccountsById', params)

export const getAccountsByName = async (params) =>
  fetchHelper('getAccountsByName', params)
```

## Wrapping up

And thats it, boot up your local dev server using `npx @lwc-garden/core dev` and your apex methods will now be calling your actual Salesforce Org.