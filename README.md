# ledge-typescript-api-client

This is an early version of Ledge Developer Docs. Our API is still in active early stages of development and is subject to change.

Welcome to Ledge Developer Docs. We are constantly improving and we'd greattly appreciate your feedback, so please feel free to create issues or chat with ethan@theledge.io.

[COMING SOON] We also have a developer chat in our discord.

Table of Contents:
[WIP]

# Important Notes

- We recommend you use our SDK on the server side for performance and security.
- We recommend you track user activity in batches.

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

## 3. Register user so we can track activity

- Register this user as soon as possible, ideally when they open the game. so that we can start tracking player activity, and reward progress towards quests.

```
import { ExternalApi } from "@ledgelabs/typescript-api-client";

const extApi = new ExternalApi(config);

await extApi.registerUser("fake-api-key", {
    userId: "fake-user-id",
    username: "random-fake-username",
    originalCreationDate: new Date().toISOString(),
});
```

## 4. Track in game user activity

```
await extApi.trackActivity({
    activityId: "kill-5-ogres",
    occurrence: "2024-04-20T18:18:03.369Z",
    userId: "fake-user-id",
    count: 1,
  });
```

# SDK Reference

### registerUser(externalUser: ExternalUser)

**Description**

Registers this user (externally) with Ledge, so we can begin tracking their in game activity

Ideally, call this method as soon as this user starts the game.

**Params**

```
export interface ExternalUser {
    originalCreationDate?: string;
    userId: string;
    username: string;
}
```

originalCreationDate is used for attribution purposes and revenue sharing but is optional, leaving this undefined will simply not attribute this user's acquisition and consequently no revenue shared. **Input this parameter if unsure**.

username does not need to be unique.

userId must be unique per user per game.

**Return Type**

```
export interface RegisterUser200Response {
    linkingCode: string;
    ledgeLink: string;
}
```

linkingCode is a unique code per user per game, used to identify your registered user with a Ledge account.

ledgeLink is a link to Ledge login page with a linking code.

### trackActivity(trackActivityInput: TrackActivityInput)

**Description**

Tracks a single game activity/event from a user.

Use this method, if there are no plans to track activities in batches. Otherwise, tracking activities in batches is preferred for efficiency and to reduce load on our systems.

**Params**

```
export interface TrackActivityInput {
    occurrence: string;
    count?: number;
    activityId: string;
    userId: string;
}

```

occurrence is the datetime of when this event occurred in ISO format. Example: 2024-04-20T18:18:03.369Z

count is the number of times this event happened. Default is 1.

activityId is similar to an analytics tracking event name which is used to identify activities with their quests.

userId is the same userId used to register this user.

**Return Type**

```
export interface TrackActivity200Response {
  message: string;
}
```

message indicating activity has been successfully recorded and has been queued for processing.
