export function strategyAdminEmail({ name, email, company, phone, website, budget, service, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Strategy Session Request</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#e73103,#f58e1e);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Squad Tech Solution</p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">New Strategy Request</h1>
          <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">${company} · ${service}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
          <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">A new strategy session request was submitted via the <strong style="color:#e73103;">Start a Project</strong> form on squadtechsol.com.</p>

          <!-- Contact info row -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
            <tr>
              <td width="50%" style="padding:12px 8px 12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Full Name</p>
                <p style="margin:0;font-size:15px;color:#222;font-weight:600;">${name}</p>
              </td>
              <td width="50%" style="padding:12px 0 12px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Email</p>
                <a href="mailto:${email}" style="display:block;font-size:15px;color:#e73103;font-weight:600;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:12px 8px 12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Company / Brand</p>
                <p style="margin:0;font-size:15px;color:#222;font-weight:600;">${company}</p>
              </td>
              <td width="50%" style="padding:12px 0 12px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Phone</p>
                <a href="tel:${phone}" style="display:block;font-size:15px;color:#222;font-weight:600;text-decoration:none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:12px 8px 12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Website</p>
                <p style="margin:0;font-size:15px;color:#222;font-weight:600;">${website || '—'}</p>
              </td>
              <td width="50%" style="padding:12px 0 12px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Estimated Budget</p>
                <p style="margin:0;font-size:15px;color:#f58e1e;font-weight:700;">${budget}</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Service Interested In</p>
                <p style="margin:0;font-size:15px;color:#222;font-weight:600;">${service}</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:12px 0;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Project Details</p>
                <div style="background:#fafafa;border-left:3px solid #e73103;border-radius:0 6px 6px 0;padding:14px 16px;">
                  <p style="margin:0;font-size:15px;color:#444;line-height:1.7;">${message || 'No additional details provided.'}</p>
                </div>
              </td>
            </tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr>
              <td align="center" style="padding-right:8px;" width="50%">
                <a href="mailto:${email}" style="display:block;background:linear-gradient(135deg,#e73103,#f58e1e);color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:13px 20px;border-radius:8px;text-align:center;">Reply to ${name} →</a>
              </td>
              <td align="center" style="padding-left:8px;" width="50%">
                <a href="tel:${phone}" style="display:block;background:#f9f9f9;border:1px solid #e8e8e8;color:#333;font-size:13px;font-weight:600;text-decoration:none;padding:13px 20px;border-radius:8px;text-align:center;">Call ${phone}</a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#aaa;">Submitted via squadtechsol.com/start</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function strategyAutoReply({ name, service }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your strategy session request</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:linear-gradient(135deg,#e73103,#f58e1e);border-radius:12px 12px 0 0;padding:40px 40px 32px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Squad Tech Solution</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;">Request Received!</h1>
          <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.85);line-height:1.6;">Your free strategy session for <strong>${service}</strong> is queued.</p>
        </td></tr>

        <tr><td style="background:#ffffff;padding:40px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
          <p style="margin:0 0 16px;font-size:16px;color:#222;font-weight:600;">Hey ${name},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">We've received your strategy request and our team is already reviewing your details. A dedicated specialist will reach out within <strong style="color:#e73103;">24 hours</strong> with your custom plan.</p>
          <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7;">Want to skip the wait? Book a call directly and we'll get started today.</p>

          <!-- What to expect -->
          <div style="background:#fafafa;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;">What happens next</p>
            <table cellpadding="0" cellspacing="0">
              <tr><td style="padding:5px 0;font-size:14px;color:#444;">
                <span style="display:inline-block;width:20px;height:20px;background:#e73103;border-radius:50%;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:20px;margin-right:10px;vertical-align:middle;">1</span>
                Our team reviews your goals and budget
              </td></tr>
              <tr><td style="padding:5px 0;font-size:14px;color:#444;">
                <span style="display:inline-block;width:20px;height:20px;background:#f58e1e;border-radius:50%;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:20px;margin-right:10px;vertical-align:middle;">2</span>
                We build a custom strategy — completely free
              </td></tr>
              <tr><td style="padding:5px 0;font-size:14px;color:#444;">
                <span style="display:inline-block;width:20px;height:20px;background:#e73103;border-radius:50%;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:20px;margin-right:10px;vertical-align:middle;">3</span>
                We present it — no commitment required
              </td></tr>
            </table>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="https://calendly.com/squadtechsolution/inquiry" style="display:inline-block;background:linear-gradient(135deg,#e73103,#f58e1e);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:8px;">Book a Free Call →</a>
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
