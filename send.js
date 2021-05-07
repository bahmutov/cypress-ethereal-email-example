const initEmailer = require('./emailer')

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const emailer = await initEmailer()
  // send an email
  const info = await emailer.sendMail({
    from: '"Fred Blogger" <freg@blogger.com>',
    to: 'gleb@startup.io', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world!', // plain text body
    html: '<b>Hello world!</b> from my <i>email</i>', // html body
  })

  console.log('Message sent: %s', info.messageId)
}

main().catch(console.error)
