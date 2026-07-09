import { Resend } from 'resend'
import { contactAdminEmail, contactAutoReply } from '../server/templates/contactEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const TEAM_EMAIL = 'inquiry@squadtechsol.com'
const FROM_EMAIL = 'Squad Tech Solution <noreply@squadtechsol.com>'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, service, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: TEAM_EMAIL,
        replyTo: email,
        subject: `New contact from ${name}`,
        html: contactAdminEmail({ name, email, service, message }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `We received your message, ${name}!`,
        html: contactAutoReply({ name }),
      }),
    ])

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
