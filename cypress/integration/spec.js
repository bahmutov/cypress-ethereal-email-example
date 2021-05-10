/// <reference types="cypress" />
// @ts-check

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

    // ANTI-PATTERN wait for 30 seconds
    // then get the email and hope it has arrived
    cy.wait(30000)
    cy.task('getLastEmail')
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

        cy.get('#confirmation_code').type(code)
        cy.location('pathname').should('equal', '/confirm')
        cy.get('button[type=submit]').click()
        cy.get('[data-cy=incorrect-code]').should('not.exist')
        cy.get('[data-cy=confirmed-code]').should('be.visible')
      })
  })
})
