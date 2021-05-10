var imaps = require('imap-simple')
const simpleParser = require('mailparser').simpleParser

// run by injecting inbox login information
// http://github.com/bahmutov/as-a
// as-a cypress-ethereal-email-example-inbox node ./receive
var config = {
  imap: {
    user: process.env.ETHEREAL_EMAIL,
    password: process.env.ETHEREAL_PASSWORD,
    host: 'imap.ethereal.email',
    port: 993,
    tls: true,
    authTimeout: 10000,
  },
}

const seeEmails = async () => {
  const connection = await imaps.connect(config)

  await connection.openBox('INBOX')
  var searchCriteria = ['1:5']
  var fetchOptions = {
    bodies: [''],
  }
  const messages = await connection.search(searchCriteria, fetchOptions)
  if (!messages.length) {
    console.log('cannot find any emails')
  } else {
    const mail = await simpleParser(messages[0].parts[0].body)
    console.log(mail.subject)
    console.log(mail.text)
    console.log(mail.html)
  }

  connection.end()
}

seeEmails().then(
  () => {
    console.log('all done')
  },
  (err) => {
    console.error(err)
  },
)
