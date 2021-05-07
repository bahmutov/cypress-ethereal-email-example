/// <reference types="cypress" />

// use the application code to send / check emails
const initEmailer = require('../../emailer')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  const emailer = await initEmailer()
  // pass the test email account to the specs
  // using the config.env object
  // accessible via Cypress.env('testEmail')
  config.env.testEmail = emailer.testAccount.user

  // // [receiver email]: email text
  // let lastEmail = {}

  // // process all emails
  // mailServer.bind((addr, id, email) => {
  //   console.log('--- email to %s ---', email.headers.to)
  //   console.log(email.body)
  //   console.log('--- end ---')
  //   // store the email by the receiver email
  //   lastEmail[email.headers.to] = {
  //     body: email.body,
  //     html: email.html,
  //   }
  // })

  on('task', {
    resetEmails(email) {
      console.log('reset all emails')
      // if (email) {
      //   delete lastEmail[email]
      // } else {
      //   lastEmail = {}
      // }
      return null
    },

    getLastEmail(email) {
      // cy.task cannot return undefined
      // thus we return null as a fallback
      // return lastEmail[email] || null
      return null
    },
  })

  // important: return the changed config
  return config
}
