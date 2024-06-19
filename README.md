# ledge-typescript-api-client

This is an early version of Ledge Developer Docs. Our API is still in active early stages of development and is subject to change.

Welcome to Ledge Developer Docs. We are constantly improving and we'd greatly appreciate your feedback, so please feel free to create issues or chat with ethan@theledge.io.

[COMING SOON] We also have a developer chat in our Discord.

## Table of Contents

- [Important Notes](#important-notes)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [1. Install the npm package](#1-install-the-npm-package)
  - [2. Setup Configuration](#2-setup-configuration)
  - [3. Register User](#3-register-user)
  - [4. Track User Activity](#4-track-user-activity)
- [SDK Reference](#sdk-reference)
  - [registerUser](#registeruserexternaluser-externaluser)
  - [trackActivity](#trackactivitytrackactivityinput-trackactivityinput)
  - [trackBatchActivitiesByUser](#trackbatchactivitiesbyuseruseridstring-inputs-trackbatchactivitiesinput)

# Important Notes

- We recommend you use our SDK on the server side for performance and security.
- We recommend you track user activity in batches.

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

### 3. Register user so we can track activity

- Register this user as soon as possible, ideally when they open the game. so that we can start tracking player activity and reward progress towards quests.

```
import { ExternalApi } from "@ledgelabs/typescript-api-client";

const ledgeApi = new ExternalApi(config);

await ledgeApi.registerUser("fake-api-key", {
    userId: "fake-user-id",
    username: "random-fake-username",
    originalCreationDate: new Date().toISOString(),
});
```

### 4. Track in-game user activity

```
await ledgeApi.trackActivity({
    activityId: "kill-5-ogres",
    occurrence: "2024-04-20T18:18:03.369Z",
    userId: "fake-user-id",
    count: 1,
  });
```

# SDK Reference

<details>
<summary>registerUser(externalUser: ExternalUser)</summary>

#### Description

Registers this user (externally) with Ledge, so we can begin tracking their in game activity

Ideally, call this method as soon as this user starts the game.

#### Params

```
export interface ExternalUser {
    originalCreationDate?: string;
    userId: string;
    username: string;
}
```

_originalCreationDate_ is used for attribution purposes and revenue sharing but is optional, leaving this undefined will simply not attribute this user's acquisition and consequently no revenue shared. **Input this parameter if unsure**.

_username_ does not need to be unique.

_userId_ must be unique for each player within a game (per API_KEY)

#### Return Type

```
export interface RegisterUser200Response {
    linkingCode: string;
    ledgeLink: string;
}
```

_linkingCode_ is a unique code per user per game, used to identify your registered user with a Ledge account.

_ledgeLink_ is a link to Ledge login page with a linking code.

</details>

<details>
<summary>trackActivity(trackActivityInput: TrackActivityInput)</summary>

#### Description

Tracks a single game activity/event from a user.

In order to prevent tracking duplicate activities **each userId, activityId, and occurrence when combined should be unique**.

Use this method, if there are no plans to track activities in batches. Otherwise, tracking activities in batches is preferred for efficiency and to reduce load on our systems.

#### Params

```
export interface TrackActivityInput {
    occurrence: string;
    count?: number;
    activityId: string;
    userId: string;
}

```

_occurrence_ is the datetime of when this event occurred in ISO format. Example: 2024-04-20T18:18:03.369Z

_count_ is the number of times this event happened. Default is 1.

_activityId_ is similar to an analytics tracking event name which is used to identify activities with their quests.

_userId_ is the same userId used to register this user.

#### Return Type

```
export interface TrackActivity200Response {
  message: string;
  data: {
    activityId: string;
    userId: string;
    count: number;
    occurence: Date;
    processed: boolean;
  } | null;
}
```

_message_ indicating activity has been successfully recorded and has been queued for processing.

_data_ is null if no activity was tracked. Otherwise, returns tracked activity data.

</details>

<details>
<summary>trackBatchActivitiesByUser(userId:string, inputs: TrackBatchACtivitIesInput)</summary>

#### Description

Track an array of game activities (events) for a given user ID.

This method is similar to [trackActivity](#trackactivitytrackactivityinput-trackactivityinput), but it allows tracking multiple activities in a single request.

#### Params

```
userId: string

export interface TrackBatchActivitiesInput = {
  activityId: string;
  count?: number;
  occurrence: string;
}[];

```

See [trackActivity](#trackactivitytrackactivityinput-trackactivityinput) for details about params.

#### Return Type

```
export interface TrackBatchActivitiesByUser200Response {
    'count': number;
    'message': string;
}

```

count indicating the number of succesfully inserted activities.

message indicating activity has been successfully recorded and has been queued for processing.

</details>

## Ledge Client Error Types

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
