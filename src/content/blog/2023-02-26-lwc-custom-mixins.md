---
title: 'Lightning Web Components: Custom Mixins'
slug: 'lwc-custom-mixins'
date: 2023-02-26
editedDate: 2023-03-08
description: A short guide on how to implement your own custom mixins in LWC
tags: ['salesforce', 'lwc']
---

Mixins (or Abstract subclasses) are templates for classes that allow us to write generic functionality to be reused. Given the nature of classes, it is not possible to have more than one superclass. Mixins allow us to pass the base class as a property and unlock nested inheritance.

## JavaScript Mixin Usage

Before we dive into an LWC example, lets look at how we can use mixins in a plain javascript environment.

Firstly, we must create a mixin function that our classes can use. This should be a piece of generic functionality that multiple classes can utalise.

```javascript
// A simple Mixin method
// adds the `windowSize()` method to classes that implement this mixin
export const WindowSizeMixin = (BaseClass) =>
  class extends BaseClass {
    get windowSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }
  }
```

```javascript
import { WindowSizeMixin } from './windowSizeMixin'

// Implementing the `WindowSizeMixin` gives us access to the
// `this.windowSize` getter
class Header extends WindowSizeMixin(BaseClass) {
  getWindowSize() {
    return this.windowSize
  }
}
```

In the above example, calling the `getWindowSize()` function on our Header class will return the object defined in the `WindowSizeMixin`.

## LWC Mixin Usage

Now we have a basic understanding of how mixins work in JavaScript, lets look at how the concept applies to LWC. Using mixins in LWC is almost identical with one difference, your `BaseClass` should be `LightningElement` (or another class that has extended `LightningElement`).

We'll assume the same above mixin source code that we used above (`WindowSizeMixin`) but instead our implementation will be a LWC component.

```javascript
// don't forget to import LightningElement, we need to extend it as our base class
import { LightningElement } from 'lwc'

// assume our mixin has been created as a separate LWC to be used by multiple components
import { WindowSizeMixin } from 'c/windowSizeMixin'

// LWC expects a default export of our `LightingElement` extended component
export default class Header extends WindowSizeMixin(LightningElement) {
  getWindowSize() {
    // available via the WindowSizeMixin
    return this.windowSize
  }
}
```

## Stacking Mixins

The beauty of mixins is that you can use more than one. This can be useful for creating smaller snippet mixins for similar functionality that is used across multiple LWCs.

Lets have a quick look at an example. We will create another mixin method.

```javascript
export const DateMixin = (BaseClass) =>
  class extends BaseClass {
    // a function that returns the current date as an object
    getDate() {
      const date = new Date()
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }
    }
  }
```

Lets update our LWC example from above to include the new `DateMixin`.

```javascript
// don't forget to import LightningElement, we need to extend it as our base class
import { LightningElement } from 'lwc'

// assume our mixins have been created as a separate LWC to be used by multiple components
import { WindowSizeMixin } from 'c/windowSizeMixin'
import { DateMixin } from 'c/dateMixin'

// LWC expects a default export of our component
// we can stack mixins here
export default class Header extends DateMixin(
  WindowSizeMixin(LightningElement)
) {
  getWindowSize() {
    // available via the WindowSizeMixin
    return this.windowSize
  }
  getCurrentDate() {
    // available via the DateMixin
    return this.getDate()
  }
}
```

## Using `@wire` in a Custom Mixin

[`@wire`](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_wire_service_about) is a service that streams immutable data to the component. This is heavily used in on platform development and a must when it comes to building dynamic components.

Lets have a look at a simple example mixin that uses the standard [`getRecord`](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_record) wire method.

```javascript
import { wire } from 'lwc'
import { getRecord } from 'lightning/uiRecordApi'

export const AccountWireMixin = (BaseClass) =>
  class extends BaseClass {
    // explicitly not setting recordId so that the consuming
    // component can choose how it wishes to implement it (e.g @api, get/set)
    // recordId

    // this can be dynamically changed by the implementing class if needed
    // this array acts as a default field list
    fieldRef = ['Account.Id', 'Account.Name', 'Account.Phone']

    @wire(getRecord, {
      recordId: '$recordId',
      fields: '$fieldRef',
    })
    wiredGetRecord(response) {
      // you can choose to either set the data to a variable for you component to consume
      // or fire off a function that your consuming component can override.
      // for this example, we will call a method
      this.handleWiredAccount(response)
    }

    /**
     * This method should be overriden by the consuming component
     */
    handleWiredAccount = (response) => {
      const { error, data } = response

      if (error) {
        // TODO: handle errors
      } else if (data) {
        // TODO: handle success
      }
    }
  }
```

We can update our above example and stack the `AccountWireMixin` on top.

```javascript
// don't forget to import LightningElement, we need to extend it as our base class
import { LightningElement } from 'lwc'

// assume our mixins have been created as a separate LWC to be used by multiple components
import { WindowSizeMixin } from 'c/windowSizeMixin'
import { DateMixin } from 'c/dateMixin'
import { AccountWireMixin } from 'c/accountWireMixin'

// LWC expects a default export of our component
// we can stack mixins here
export default class Header extends AccountWireMixin(
  DateMixin(WindowSizeMixin(LightningElement))
) {
  // ... existing code

  // override the shell method defined in the AccountWireMixin
  handleWiredAccount = (response) => {
    const { error, data } = response

    if (error) {
      // TODO: handle errors
      console.error('Oh no, something went wrong ', error)
    } else if (data) {
      // TODO: handle success
      console.log('We have account data, yay ', data)
    }
  }
}
```

## Wrapping up

In conclusion, mixins are an incredibly useful tool in LWC development. They allow us to write generic, reusable functionality that can be shared between multiple components. By stacking multiple mixins, we are able to compose complex components from smaller, focused mixins. Mixins help keep our code DRY (Don't Repeat Yourself) and maintainable.