import { Resend } from 'resend'
import { strategyAdminEmail, strategyAutoReply } from '../server/templates/strategyEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const TEAM_EMAIL = 'inquiry@squadtechsol.com'
const FROM_EMAIL = 'Squad Tech Solution <noreply@squadtechsol.com>'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, phone, website, budget, service, message } = req.body

  if (!name || !email || !company || !phone || !budget || !service) {
    return res.status(400).json({ error: 'Please fill in all required fields.' })
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: TEAM_EMAIL,
        replyTo: email,
        subject: `New strategy request — ${company} (${service})`,
        html: strategyAdminEmail({ name, email, company, phone, website, budget, service, message }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Your strategy session request is confirmed, ${name}!`,
        html: strategyAutoReply({ name, service }),
      }),
    ])

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Strategy email error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
