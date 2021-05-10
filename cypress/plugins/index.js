/// <reference types="cypress" />

const makeEmailAccount = require('./email-account')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  const emailAccount = await makeEmailAccount()

  // pass the test email account to the specs
  // using the config.env object
  // accessible via Cypress.env('testEmail')
  config.env.testEmail = emailAccount.email

  on('task', {
    getLastEmail() {
      return emailAccount.getLastEmail()
    },
  })

  // important: return the changed config
  return config
}
