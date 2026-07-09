import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { contactAdminEmail, contactAutoReply } from './templates/contactEmail.js'
import { strategyAdminEmail, strategyAutoReply } from './templates/strategyEmail.js'

const app = express()
const resend = new Resend(process.env.RESEND_API_KEY)

const TEAM_EMAIL = 'inquiry@squadtechsol.com'
const FROM_EMAIL = 'Squad Tech Solution <noreply@squadtechsol.com>'

app.use(cors())
app.use(express.json())

app.post('/api/contact', async (req, res) => {
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

    res.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

app.post('/api/strategy', async (req, res) => {
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

    res.json({ success: true })
  } catch (err) {
    console.error('Strategy email error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
