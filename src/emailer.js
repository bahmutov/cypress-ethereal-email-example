// @ts-check
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

  if (!process.env.SENDGRID_HOST) {
    throw new Error(`Missing SENDGRID_ variables`)
  }

  const host = process.env.SENDGRID_HOST
  const port = Number(process.env.SENDGRID_PORT)
  const secure = port === 465
  const auth = {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD,
  }

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
  })

  emailSender = {
    /**
     * Sends an email using node mailer via Ethereal SMTP server
     * @param {*} options Email options object
     * @returns info object with sent email id
     */
    async sendMail(options) {
      if (process.env.SENDGRID_FROM) {
        options = { ...options, from: process.env.SENDGRID_FROM }
      }
      const info = await transporter.sendMail(options)
      console.log('Message sent to %s', options.to)

      return info
    },
  }

  return emailSender
}

module.exports = initEmailer
