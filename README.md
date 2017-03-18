x-notification
==============

[![Greenkeeper badge](https://badges.greenkeeper.io/steelbrain/x-notification.svg)](https://greenkeeper.io/)

X-Notification is an HTML5 Custom Element derived from the awesome [Codrops demo](tympanus.net/Development/NotificationStyles/).

For browsers who don't support custom elements natively, You're gonna need to import a polyfill :(

#### API

```js
class XNotification extends HTMLElement {
  dismiss()
  static create(message: string, options: Object{type: string, autoremove: boolean})
}
```

#### Example Usage

Attributes other than `message` are optional.

```html
<x-notification message="A Message" autoremove="false" type="notice"></x-notification>
```
```js
const notification = XNotification.create("A Notification")
setTimeout(function(){
  notification.dismiss()
}, 25e2)
```

#### License

This project is licensed under the terms of MIT License. See the License file for more info.
