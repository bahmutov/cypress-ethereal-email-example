/// <reference types="cypress" />

const codes = require('../../confirmation-codes')

// Cypress can perform unit tests
// for any code that can run in the browser
describe('Confirmation codes', () => {
  it('issues a new code', () => {
    const email = 'foo@bar.com'
    const code = codes.createCode(email)
    expect(code, 'created code').to.be.a('string')
    expect(codes.checkCode(email, code), 'confirm').to.be.true
    expect(codes.checkCode(email, code + '2'), 'wrong code').to.be.false
    expect(codes.checkCode('unknown@email.com', code), 'unknown email').to.be
      .false

    codes.reset()
    expect(codes.checkCode(email, code), 'after reset').to.be.false
  })
})
