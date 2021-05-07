// https://nodemailer.com/about/
const nodemailer = require('nodemailer')

// a little wrapper object that makes
// sending emails more convenient
let emailSender

const initEmailer = async () => {
  if (emailSender) {
    // already created
    return emailSender
  }

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()

  console.log('created Ethereal test account %s', testAccount.user)

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  emailSender = {
    /**
     * created Ethereal email account
     */
    testAccount,

    /**
     * Sends an email using node mailer via Ethereal SMTP server
     * @param {*} options Email options object
     * @returns info object with sent email id
     */
    async sendMail(options) {
      const info = await transporter.sendMail(options)
      console.log('Message sent to %s', options.to)
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

      return info
    },
  }

  return emailSender
}

module.exports = initEmailer
