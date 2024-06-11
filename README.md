# ledge-typescript-api-client

This is an early version of Ledge Developer Docs. Our API is still in active early stages of development and is subject to change.

Welcome to Ledge Developer Docs. We are constantly improving and we'd greattly appreciate your feedback, so please feel free to create issues or chat with ethan@theledge.io.

[COMING SOON] We also have a developer chat in our discord.

Table of Contents:
[WIP]

# Quick Start

## Requirements:

1. API_KEY from one of the Ledge Admins, get in contact (ethan@theledge.io)!
2. API_URL from one of the Ledge Admins, get in contact (ethan@theledge.io)!

## 1. Install our npm package at [npm package](https://www.npmjs.com/package/@ledgelabs/typescript-api-client)

```
npm i @ledgelabs/typescript-api-client

or

yarn add @ledgelabs/typescript-api-client
```

## 2. Setup Configuration

```
import { Configuration } from "@ledgelabs/typescript-api-client";

const config = new Configuration({
  apiKey: API_KEY
  basePath: API-URL,
});
```

## 3. Call our register user endpoint

```
import { ExternalApi } from "@ledgelabs/typescript-api-client";

const extApi = new ExternalApi(config);

await extApi.registerUser("fake-api-key", {
    userId: "random-fake-test-user-external",
    username: "random-fake-username",
    originalCreationDate: new Date().toISOString(),
});
```
