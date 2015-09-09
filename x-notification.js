'use strict'

// @Compiler-Transpile "true"
// @Compiler-Minify "true"
// @Compiler-Output "x-notification.min.js"

class XNotification extends HTMLElement {
  createdCallback() {
    this.config = {
      message: this.getAttribute('message') || '',
      type: 'notice',
      autoremove: this.getAttribute('autoremove')
    }
  }
  attachedCallback() {
    this.config.autoremove = this.config.autoremove === null || this.config.autoremove !== 'false'

    this.classList.add('xnotification-box')
    this.classList.add('xnotification-growl')
    this.classList.add('xnotification-effect-scale')
    this.classList.add('xnotification-type-' + this.config.type)
    this.classList.add('xnotification-show')

    const innerContent = document.createElement('div')
    innerContent.classList.add('xnotification-box-inner')
    innerContent.appendChild(typeof this.config.message === 'string' ? document.createTextNode(this.config.message) : this.config.message)
    this.appendChild(innerContent)

    const dismissButton = document.createElement('span')
    dismissButton.classList.add('xnotification-close')
    dismissButton.addEventListener('click', () => {
      this.dismiss()
    })
    this.appendChild(dismissButton)

    if (this.config.autoremove) {
      setTimeout(() => {
        this.dismiss()
      }, 4000)
    }
  }
  dismiss() {
    if (!this.dismissed) {
      this.dismissed = true
      this.classList.remove('xnotification-show')
      setTimeout(() => {
        this.classList.add('xnotification-hide')
        setTimeout(() => {
          this.remove()
        }, 250)
      }, 25)
    }
  }
  attributeChangedCallback(attrName, _, attrValue) {
    if (this.config.hasOwnProperty(attrName)) {
      this.config[attrName] = attrValue
    }
  }
  static create(message, options) {
    options = options || {}
    options.message = message
    const notification = document.createElement('x-notification')
    for (let key in options) {
      notification.setAttribute(key, options[key])
    }
    XNotification.container.insertBefore(notification, XNotification.container.firstChild)
    return notification
  }
}

XNotification.container = document.createElement('div')
XNotification.container.classList.add('x-notification-container')

XNotification.Element = document.registerElement('x-notification', {
  prototype: Object.create(XNotification.prototype)
})

document.body.appendChild(XNotification.container)
