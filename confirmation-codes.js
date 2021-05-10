// [code as string]: email
let codes = {}

module.exports = {
  createCode(email) {
    const code = Math.random().toString().slice(2, 10)
    codes[code] = email

    return code
  },
  checkCode(code) {
    if (typeof code !== 'string') {
      return false
    }

    if (!codes[code]) {
      // non-existent email
      return false
    }

    // valid code
    return true
  },
  reset() {
    codes = {}
  },
}
