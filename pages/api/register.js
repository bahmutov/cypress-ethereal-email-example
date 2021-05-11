// @ts-check
const { readFileSync } = require('fs')
const { join } = require('path')
const { stripIndent } = require('common-tags')
const initEmailer = require('../../src/emailer')

// singleton
const codes = require('../../src/confirmation-codes')

const confirmationEmailPath = join(
  process.cwd(), // should be the root folder of the project
  'emails',
  'confirmation-code.html',
)
const confirmationEmailTemplateHTML = readFileSync(
  confirmationEmailPath,
  'utf-8',
)

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, companySize } = req.body

    const confirmationCode = codes.createCode(email, name)
    console.log(
      'for "%s" at %s the confirmation code is %s',
      name,
      email,
      confirmationCode,
    )
    const confirmationEmailHTML = confirmationEmailTemplateHTML
      .replace('%USER_NAME%', name)
      .replace('%CONFIRMATION_CODE%', confirmationCode)

    // return to the HTTP caller right away
    res.status(200).json({ name, email })

    // and then send an email
    const text = stripIndent`
      Dear ${name},

      Your confirmation code is ${confirmationCode}
    `

    const emailer = await initEmailer()
    const info = await emailer.sendMail({
      from: '"Registration system" <reg@company.co>',
      to: email,
      subject: 'Confirmation code 1️⃣2️⃣3️⃣',
      text,
      html: confirmationEmailHTML,
    })
    console.log('sent a confirmation email to %s', email)
    return
  }

  return res.status(404)
}
