export function contactAdminEmail({ name, email, service, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Contact Form Submission</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#e73103,#f58e1e);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Squad Tech Solution</p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">New Contact Message</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
          <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">A new message was submitted via the contact form on <strong style="color:#e73103;">squadtechsol.com</strong>.</p>

          <!-- Fields -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Name</p>
                <p style="margin:0;font-size:15px;color:#222;font-weight:600;">${name}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Email</p>
                <a href="mailto:${email}" style="display:block;font-size:15px;color:#e73103;font-weight:600;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Service Interested In</p>
                <p style="margin:0;font-size:15px;color:#222;font-weight:600;">${service || 'Not specified'}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Message</p>
                <div style="background:#fafafa;border-left:3px solid #e73103;border-radius:0 6px 6px 0;padding:14px 16px;">
                  <p style="margin:0;font-size:15px;color:#444;line-height:1.7;">${message}</p>
                </div>
              </td>
            </tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr><td align="center">
              <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#e73103,#f58e1e);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.5px;">Reply to ${name} →</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#aaa;">This email was sent from the contact form at <strong>squadtechsol.com</strong></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function contactAutoReply({ name }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>We received your message</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:linear-gradient(135deg,#e73103,#f58e1e);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Squad Tech Solution</p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">We got your message!</h1>
        </td></tr>

        <tr><td style="background:#ffffff;padding:40px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
          <p style="margin:0 0 16px;font-size:16px;color:#222;font-weight:600;">Hey ${name},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">Thanks for reaching out! We've received your message and one of our team members will get back to you within <strong style="color:#e73103;">24 business hours</strong>.</p>
          <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">In the meantime, feel free to book a free discovery call directly on Calendly — no commitment, just an honest conversation about your goals.</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="https://calendly.com/squadtechsolution/inquiry" style="display:inline-block;background:linear-gradient(135deg,#e73103,#f58e1e);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;">Book a Free Call →</a>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#aaa;">Squad Tech Solution — 276 Holten Ave, New York</p>
          <p style="margin:0;font-size:12px;color:#aaa;"><a href="mailto:inquiry@squadtechsol.com" style="color:#e73103;text-decoration:none;">inquiry@squadtechsol.com</a> · <a href="tel:+12018206889" style="color:#aaa;text-decoration:none;">+1 (201) 820-6889</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
