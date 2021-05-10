const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { existsSync } = require('fs')

const adapter = new FileSync('db.json')
const db = low(adapter)

if (!existsSync('db.json')) {
  db.defaults({ codes: [] }).write()
  console.log('wrote db.json')
}

module.exports = {
  createCode(email, name = '') {
    const code = Math.random().toString().slice(2, 10)
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
