/// <reference types="cypress" />
// @ts-check
// https://github.com/bahmutov/cypress-recurse
const { recurse } = require('cypress-recurse')

describe('Email confirmation', () => {
  let userEmail

  before(() => {
    // get and check the test email only once before the tests
    cy.task('getUserEmail').then((email) => {
      expect(email).to.be.a('string')
      userEmail = email
    })
  })

  it('sends confirmation code', () => {
    const userName = 'Joe Bravo'

    cy.visit('/')
    cy.get('#name').type(userName)
    cy.get('#email').type(userEmail)
    cy.get('#company_size').select('3')
    cy.get('button[type=submit]').click()

    cy.log('**shows message to check emails**')
    cy.get('[data-cy=sent-email-to]')
      .should('be.visible')
      .and('have.text', userEmail)

    // retry fetching the email
    recurse(
      () => cy.task('getLastEmail'), // Cypress commands to retry
      Cypress._.isObject, // keep retrying until the task returns an object
      {
        timeout: 60000, // retry up to 1 minute
        delay: 5000, // wait 5 seconds between attempts
      },
    )
      .its('html')
      .then((html) => {
        cy.document({ log: false }).invoke({ log: false }, 'write', html)
      })
    cy.log('**email has the user name**')
    cy.contains('[data-cy=user-name]', userName).should('be.visible')
    cy.log('**email has the confirmation code**')
    cy.get('[data-cy=confirmation-code]')
      .should('be.visible')
      .invoke('text')
      .then((code) => {
        cy.log(`**confirm code ${code} works**`)
        expect(code, 'confirmation code')
          .to.be.a('string')
          .and.have.length.gt(5)

        cy.contains('Confirm registration').click()

        cy.get('#confirmation_code', { timeout: 10000 }).type(code)
        cy.get('button[type=submit]').click()
        // first positive assertion, then negative
        // https://glebbahmutov.com/blog/negative-assertions/
        cy.get('[data-cy=confirmed-code]').should('be.visible')
        cy.get('[data-cy=incorrect-code]').should('not.exist')
      })
  })
})
