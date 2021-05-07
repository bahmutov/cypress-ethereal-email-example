var imaps = require('imap-simple')

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

imaps
  .connect(config)
  .then(function (connection) {
    return connection.openBox('INBOX').then(function () {
      var searchCriteria = ['1:5']
      var fetchOptions = {
        bodies: ['HEADER', 'TEXT'],
      }
      return connection
        .search(searchCriteria, fetchOptions)
        .then(function (messages) {
          messages.forEach(function (item) {
            console.log(item)
            // var all = _.find(item.parts, { which: 'TEXT' })
            // var html = Buffer.from(all.body, 'base64').toString('ascii')
            // console.log(html)
          })
        })
    })
  })
  .then(
    () => {
      console.log('all done')
    },
    (err) => {
      console.error(err)
    },
  )
