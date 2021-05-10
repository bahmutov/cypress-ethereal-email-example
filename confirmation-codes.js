// [code as string]: email
let codes = {}

module.exports = {
  createCode(email) {
    const code = Math.random().toString().slice(2, 10)
    codes[code] = email

    console.log('all confirmation codes')
    console.log(codes)

    return code
  },
  checkCode(code) {
    console.log('checking confirmation codes for', code)
    console.log(codes)

    if (typeof code !== 'string') {
      console.log('code %s is not a string, but %s', code, typeof code)
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
