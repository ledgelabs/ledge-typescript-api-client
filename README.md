# ledge-typescript-api-client

<i>This is an early version of Ledge Developer Docs. Our API is still in early stages of development and is subject to change.</i>

Welcome to Ledge Developer Docs. We are constantly improving and we'd greatly appreciate your feedback, so please feel free to create issues or chat with ethan@theledge.io.

## Table of Contents

- [Important Notes](#important-notes)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [1. Install the npm package](#1-install-the-npm-package)
  - [2. Setup Configuration](#2-setup-configuration)
  - [3. Register User](#3-register-user)
  - [4. Track User Activity](#4-track-user-activity)

# Important Notes

- We recommend you use our SDK on the server side for performance and security.
- Ideally, have our SDK integrated and ready for testing 1-2 weeks before the event start date.
- Optionally, setup a chat with our devs to ensure smooth integration.

# Quick Start

### Requirements:

1. API_KEY from one of the Ledge Admins, get in contact (ethan@theledge.io)!
2. API_URL from one of the Ledge Admins, get in contact (ethan@theledge.io)!

### 1. Install our npm package at [npm package](https://www.npmjs.com/package/@ledgelabs/typescript-api-client)

```
npm i @ledgelabs/typescript-api-client

or

yarn add @ledgelabs/typescript-api-client
```

### 2. Setup Configuration

```
import { Configuration } from "@ledgelabs/typescript-api-client";

const config = new Configuration({
  apiKey: API_KEY
  basePath: API_URL,
});
```

### 3. Choose Your Method of Implementation

If you've chosen <b>Unique Player Email Method (Recommended)</b>, go to step 4.</br>

If you've chosen <b>Unique Player ID Method</b>, go to step 5 & 6.

### 4. Unique Player Email Method (Recommended)

You can begin tracking player game data right away.

```
import { ExternalApi } from "@ledgelabs/typescript-api-client";

const ledgeApi = new ExternalApi(config);

await ledgeApi.trackActivity({
    email: "myplayeremail@email.com",
    activityId: "kill-5-ogres",
    occurrence: "2024-04-20T18:18:03.369Z",
    userId: "unique-user-id",
    count: 1,
  });
```

<i>You're done!</i>

### 5. Unique Player ID method (Alternative)

- To start tracking player game data as soon as possible, register this user right when they open the game.
- Original creation date is when this user first joined your game.
- Return this response to the client side

```
import { ExternalApi } from "@ledgelabs/typescript-api-client";

const ledgeApi = new ExternalApi(config);

const response = await ledgeApi.registerUser("fake-api-key", {
    userId: "fake-user-id",
    username: "random-fake-username",
    originalCreationDate: new Date().toISOString(),
});
```

### 6. Track in-game user activity

```
await ledgeApi.trackActivity({
    activityId: "kill-5-ogres",
    occurrence: "2024-04-20T18:18:03.369Z",
    userId: "unique-user-id",
    count: 1,
  });
```

<br>

# Ledge Client Error Types

### ApiError

| Property | Description                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| code     | Ledge Specific status code which follows [HTTP response status codes](#https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) for the most part. |
| message  | Error message associated with this error code                                                                                                       |

### Error Codes

`403` Invalid Api Key. Please reach out to Ledge.

`400` Bad Request (e.g missing data, invalid inputs).

`409` Conflict: User not registered, skipping this user. Make sure this user is registered with the ledge via [registerUser](#registeruserexternaluser-externaluser)

`500` Internal Server Error.
