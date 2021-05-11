/// <reference types="cypress" />

describe('Email confirmation', () => {
  it('sends confirmation code', () => {
    cy.visit('/')

    cy.readFile('email.html').then((html) => {
      cy.document({ log: false }).invoke({ log: false }, 'write', html)
    })
    cy.log('**email has the confirmation code**')
    cy.get('[data-cy=confirmation-code]')
      .should('be.visible')
      .invoke('text')
      .then((code) => {
        cy.log(`**confirm code ${code} works**`)

        cy.contains('Confirm registration').click()
        // the test runner should navigate to http://localhost:3000/confirm

        cy.location('pathname').should('equal', '/confirm')
        cy.get('#confirmation_code').type(code)
      })
  })
})
