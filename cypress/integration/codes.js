/// <reference types="cypress" />

const codes = require('../../confirmation-codes')

// Cypress can perform unit tests
// for any code that can run in the browser
describe('Confirmation codes', () => {
  it('issues a new code', () => {
    const email = 'foo@bar.com'
    const code = codes.createCode(email)
    expect(code, 'created code').to.be.a('string')

    expect(codes.checkCode(code), 'confirm').to.be.true
    // can check multiple times
    expect(codes.checkCode(code), 'confirm').to.be.true
  })

  it('returns false for invalid codes', () => {
    const code = codes.createCode('some@email.com')
    expect(code, 'created code').to.be.a('string')
    expect(codes.checkCode(code + '2'), 'wrong code').to.be.false
    expect(codes.checkCode(1234), 'non-string code').to.be.false
    expect(codes.checkCode(), 'undefined code').to.be.false
    expect(codes.checkCode(null), 'null code').to.be.false
  })

  it('resets the codes', () => {
    const code = codes.createCode('some@email.com')
    expect(code, 'created code').to.be.a('string')
    expect(codes.checkCode(code), 'confirm').to.be.true
    codes.reset()
    expect(codes.checkCode(code), 'after reset').to.be.false
  })
})
