// @ts-check

// singleton
const codes = require('../../src/confirmation-codes')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { code } = req.body

    const confirmed = codes.checkCode(code)
    console.log('code %s is %s', code, confirmed)

    return res.status(200).json({ code, confirmed })
  }

  return res.status(404)
}
