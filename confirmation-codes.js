const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { existsSync } = require('fs')
const crypto = require('crypto')

const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = {
  createCode(email, name = '') {
    if (!existsSync('db.json')) {
      db.defaults({ codes: [] }).write()
      console.log('wrote db.json')
    }

    const code = crypto.randomBytes(4).toString('hex')
    db.get('codes')
      .push({
        code,
        email,
        name,
        timestamp: new Date().toISOString(),
      })
      .write()

    return code
  },
  checkCode(code) {
    console.log('checking confirmation codes for', code)

    if (typeof code !== 'string') {
      console.log('code %s is not a string, but %s', code, typeof code)
      return false
    }

    const found = db.get('codes').find({ code }).value()
    if (!found) {
      // non-existent email
      return false
    }

    // we could check the timestamp to make sure
    // the confirmation code is still valid
    return true
  },
  reset() {
    db.set('posts', []).write()
    console.log('reset db.json')
  },
}
