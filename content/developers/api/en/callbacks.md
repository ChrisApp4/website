---
title: Callbacks
position: 7
layout: documentation
meta:
  title:
  description:
---

A **callback** is a convenient way for a client to be notified of a change on a particular set or resources. It can be used to monitor orders, customers, locations or catalogs.

There are 2 types of callbacks:

- An **active callback** is a URL set up on your server which HubRise calls every time an event occurs. If the URL is not immediately available, HubRise makes a couple more attempts a few minutes later.

- A **passive callback** records the events but does not send them. The client needs to poll HubRise regularly (every minute or so) to retrieve the events.

---

**IMPORTANT NOTE**: A client cannot receive notifications for events generated by itself. If you are testing callbacks, you need to use a separate client to trigger events.

---

Active callbacks receive a `POST` HTTP request when an event occurs. The request body includes the JSON representation of the previous and new states of the affected resource:

```json
{
  "resource_type": "customer",
  "resource_id": "sdakm",
  "event_type": "update",
  "previous_state": {
    "id": "jdj9v",
    "email": "tom@dummy-mail.org",
    ...
  },
  "new_state": {
    "id": "jdj9v",
    "email": "jim@dummy-mail.org",
    ...
  },
  "account_id": "3r4s3",
  "location_id": "3r4s3-1"
}
```

The callback must return a `200` HTTP code to acknowledge the reception of the event. This makes HubRise delete the event.

If the callback fails to acknowledge, HubRise attempts to resend the events later. In the meantime, unacknowledged events are accessible through `GET /callback/events`.

## 1. Callbacks

A callback is specific to a connection. A connection can only have one callback.

### 1.1. Retrieve Callback

Returns the connection's callback details, including the URL and the types of events the callback listens to.

<CallSummaryTable
  endpoint="GET /callback"
  accessLevel="location, account"
/>

#### Example request:

`GET /callback`

```json
{
  "url": "https://<<YOUR DOMAIN HERE>>/hubrise_callback",
  "events": {
    "order": ["create", "update"]
  }
}
```

The `url` field is set for active callbacks only. A null `url` identifies a passive callback.

If no callback has been set, the response will be as follows:

`GET /callback`

```json
{
  "url": null,
  "events": {}
}
```

### 1.2. Create Callback

Creates a callback for the connection.

<CallSummaryTable
  endpoint="POST /callback"
  accessLevel="location, account"
/>

#### Request parameters:

| Name     | Type   | Description                                                                                  |
| -------- | ------ | -------------------------------------------------------------------------------------------- |
| `url`    | string | The URL called when an event occurs. Leave it null for a passive callback.                   |
| `events` | map    | A map with the keys being _resource type_ and the values being the *event type*s to monitor. |

- _resource type_ is one of: `order`, `customer`, `location`, `catalog` and `inventory`.
- _event type_ is one of: `create`, `update` and `patch`.

The allowed combinations are:

- `order.create`
- `order.update`
- `customer.create`
- `customer.update`
- `location.update`
- `catalog.create`
- `catalog.update`
- `inventory.patch`
- `inventory.update`

#### Example request:

`POST /callback`

```json
{
  "url": "https://<<YOUR DOMAIN HERE>>/hubrise_callback",
  "events": {
    "order": ["create"],
    "customer": ["create"]
  }
}
```

### 1.3. Delete Callback

Unregister the connection's callback.

HubRise will no longer trigger events or call the callback URL.

<CallSummaryTable
  endpoint="DELETE /callback"
  accessLevel="location, account"
/>

## 2. Events

### 2.1. Retrieve Event

Returns the event.

<CallSummaryTable
  endpoint="GET /callback/events/:event_id"
  accessLevel="location, account"
/>

#### Example request:

`GET /callback/events/ks8f6`

```json
{
  "id": "ks8f6",
  "created_at": "2020-06-25T11:43:51+02:00",
  "resource_type": "customer",
  "event_type": "update",
  "customer_list_id": "sdakm",
  "customer_id": "ve343",
  "previous_state": {
    "id": "sdakm",
    "first_name": "Thomas"
    ...
  },
  "new_state": {
    "id": "sdakm",
    "first_name": "Tomas"
    ...
  }
}
```

The returned event contains:

- the time of the resource modification
- the resource and event types
- the ids of the affected resource and the parent resources
- a copy of the state of the resource before and after the change (for update and create), or the difference between both states (for patch)

### 2.2. List Events

Returns the events that have not been acknowledged (ie deleted).

<CallSummaryTable
  endpoint="GET /callback/events"
  accessLevel="location, account"
/>

#### Example request:

`GET /callback/events`

```json
[
  {
    "id": "ks8f6",
    "created_at": "2020-06-25T11:43:51+02:00",
    "resource_type": "customer",
    "event_type": "update",
    "customer_list_id": "sdakm",
    "customer_id": "ve343"
  },
  ...
]
```

The previous and new states are not included to save bandwidth. Individual retrieve operations must be performed if states are needed.

### 2.3. Delete Event

Deletes (ie acknowledges) a callback event

A passive callback should always delete events after retrieval or they will keep on being pulled by the [List events](#22-list-events) operation.

<CallSummaryTable
  endpoint="DELETE /callback/events/:event_id"
  accessLevel="location, account"
/>

#### Example request:

`DELETE /callback/events/ks8f6`
