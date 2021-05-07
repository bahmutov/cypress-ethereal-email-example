// [email]: code
let codes = {}

module.exports = {
  createCode(email) {
    codes[email] = Math.random().toString().slice(2, 10)
    return codes[email]
  },
  checkCode(email, code) {
    if (!codes[email]) {
      // non-existent email
      return false
    }
    return codes[email] === code
  },
  reset() {
    codes = {}
  },
}
