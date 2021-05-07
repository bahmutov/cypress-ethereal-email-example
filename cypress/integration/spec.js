/// <reference types="cypress" />

describe('Email confirmation', () => {
  beforeEach(() => {
    cy.task('resetEmails')
  })

  it('has test account email', () => {
    expect(Cypress.env('testEmail')).to.be.a('string')
  })

  it('sends confirmation code', () => {
    const email = Cypress.env('testEmail')

    cy.visit('/')
    cy.get('#name').type('Joe Bravo')
    cy.get('#email').type(email)
    cy.get('#company_size').select('3')
    cy.get('button[type=submit]').click()

    cy.log('**shows message to check emails**')
    cy.get('[data-cy=sent-email-to]')
      .should('be.visible')
      .and('have.text', email)
  })
})
