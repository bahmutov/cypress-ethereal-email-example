var imaps = require('imap-simple')

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
    bodies: ['HEADER', 'TEXT'],
  }
  const messages = await connection.search(searchCriteria, fetchOptions)
  messages.forEach(function (item) {
    const [header, body] = item.parts
    const message = {
      to: header.body.to[0], // the first recipient
      subject: header.body.subject[0],
      // todo: extract plan and html email bodies
      body: body.body,
    }
    console.log(message)
  })

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
