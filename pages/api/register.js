// @ts-check
const { readFileSync } = require('fs')
const { join } = require('path')
const initEmailer = require('../../emailer')

// singleton
const codes = require('../../confirmation-codes')

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
    // return to the caller right away
    res.status(200).json({ name, email })

    const confirmationCode = codes.createCode(email)
    console.log('for %s confirmation code %s', email, confirmationCode)
    const confirmationEmailHTML = confirmationEmailTemplateHTML.replace(
      '%CONFIRMATION_CODE%',
      confirmationCode,
    )

    // and then send an email
    const emailer = await initEmailer()
    const info = await emailer.sendMail({
      from: '"Registration system" <reg@company.co>',
      to: email,
      subject: 'Confirmation code 1️⃣2️⃣3️⃣',
      text: `Your confirmation code is ${confirmationCode}`,
      html: confirmationEmailHTML,
    })
    console.log('sent a confirmation email to %s', email)

    return
  }

  return res.status(404)
}
