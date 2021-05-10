/// <reference types="cypress" />

const makeEmailAccount = require('./email-account')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  const emailAccount = await makeEmailAccount()

  on('task', {
    getUserEmail() {
      return emailAccount.email
    },

    getLastEmail() {
      return emailAccount.getLastEmail()
    },
  })

  // important: return the changed config
  return config
}
