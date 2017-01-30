'use strict';
let I;

module.exports = {

  _init() {
    I = actor();
  },

  // setting locators
  fields: {
    email: 'username',
    password: 'password'
  },
  // submitButton: { css: '.loginBtn' },
  submitButton: 'Login' ,

  // introducing methods
  sendForm(email, password) {
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.click(this.submitButton);
  }
}