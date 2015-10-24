'use strict'

// @Compiler-Transpile "true"
// @Compiler-Minify "true"

const XNotification = require('custom-element-base')({
  name: 'x-notification',
  config: {
    message: {type: String, default: ''},
    type: {type: String, default: 'notice'},
    autoremove: {type: Boolean, default: true}
  },
  initialize: function() {
    this.dismissed = false

    this.classList.add('xnotification-box')
    this.classList.add('xnotification-growl')
    this.classList.add('xnotification-effect-scale')
    this.classList.add('xnotification-type-' + this.type)
    this.classList.add('xnotification-show')

    const innerContent = document.createElement('div')
    innerContent.classList.add('xnotification-box-inner')
    innerContent.appendChild(typeof this.message === 'string' ? document.createTextNode(this.message) : this.message)
    this.appendChild(innerContent)

    const dismissButton = document.createElement('span')
    dismissButton.classList.add('xnotification-close')
    dismissButton.addEventListener('click', () => {
      this.dismiss()
    })
    this.appendChild(dismissButton)

    if (this.autoremove) {
      setTimeout(() => {
        this.dismiss()
      }, 4000)
    }
  },
  dismiss: function() {
    if (this.dismissed) {
      return
    }
    this.dismissed = true
    this.classList.remove('xnotification-show')
    setTimeout(() => {
      this.classList.add('xnotification-hide')
      setTimeout(() => {
        this.remove()
      }, 250)
    }, 25)
  }
})

XNotification.create = function(message, options = {}) {
  options.message = message
  const notification = document.createElement('x-notification')
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      notification[key] = options[key]
    }
  }
  XNotification.container.insertBefore(notification, XNotification.container.firstChild)
  return notification
}

XNotification.container = document.createElement('div')
XNotification.container.classList.add('x-notification-container')

document.body.appendChild(XNotification.container)

if (typeof module !== 'undefined') {
  module.exports = XNotification
} else {
  window.XNotification = XNotification
}
