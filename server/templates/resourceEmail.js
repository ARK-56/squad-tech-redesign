export function resourceDeliveryEmail({ email, resource, downloadUrl }) {
  const { title, subtitle, description, category, highlights = [] } = resource

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your free resource from Squad Tech</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#e73103,#f58e1e);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Squad Tech Solution</p>
          <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;">Here's your free resource</h1>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);">Requested from squadtechsol.com/resources</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">

          <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.7;">You requested a resource from <strong style="color:#e73103;">Squad Tech Solution</strong>. Your download is ready — click the button below to get it.</p>

          <!-- Resource card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef9f6;border:1px solid #f0d0c0;border-radius:10px;margin-bottom:28px;">
            <tr><td style="padding:24px 28px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#e73103;">${category}</p>
              <h2 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#1a1a1a;">${title}</h2>
              <p style="margin:0 0 16px;font-size:13px;color:#999;font-weight:600;">${subtitle}</p>
              <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.6;">${description}</p>

              ${highlights.length > 0 ? `
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#777;">What's inside:</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${highlights.map(h => `
                <tr><td style="padding:4px 0;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:18px;padding-top:1px;vertical-align:top;font-size:13px;color:#e73103;font-weight:700;">→</td>
                    <td style="font-size:14px;color:#444;line-height:1.5;">${h}</td>
                  </tr></table>
                </td></tr>`).join('')}
              </table>` : ''}
            </td></tr>
          </table>

          <!-- Download CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td align="center">
              <a href="${downloadUrl}" style="display:inline-block;background:linear-gradient(135deg,#e73103,#f58e1e);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:9px;letter-spacing:0.5px;">Download ${title} →</a>
            </td></tr>
            <tr><td align="center" style="padding-top:10px;">
              <p style="margin:0;font-size:12px;color:#bbb;">Link expires in 7 days. <a href="${downloadUrl}" style="color:#e73103;text-decoration:none;">Direct link</a></p>
            </td></tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="border-top:1px solid #f0f0f0;"></td></tr>
          </table>

          <!-- Upsell section -->
          <p style="margin:0 0 8px;font-size:15px;color:#222;font-weight:600;">Want us to implement this for your brand?</p>
          <p style="margin:0 0 20px;font-size:14px;color:#666;line-height:1.7;">Our team has helped 200+ brands grow with the exact frameworks in this resource. Book a free 30-minute strategy call — no sales pitch, just honest advice on what would move the needle for your business.</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="https://calendly.com/squadtechsolution/inquiry" style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.5px;border:1px solid rgba(255,255,255,0.1);">Book Free Strategy Call →</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#aaa;">Squad Tech Solution · squadtechsol.com</p>
          <p style="margin:0;font-size:12px;color:#aaa;"><a href="mailto:inquiry@squadtechsol.com" style="color:#e73103;text-decoration:none;">inquiry@squadtechsol.com</a> · <a href="tel:+12018206889" style="color:#aaa;text-decoration:none;">+1 (201) 820-6889</a></p>
          <p style="margin:8px 0 0;font-size:11px;color:#ccc;">You received this because you requested a resource from squadtechsol.com. This is a one-time email — we won't spam you.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function resourceLeadNotification({ email, resourceTitle, slug, timestamp }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Resource Download Lead</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:linear-gradient(135deg,#e73103,#f58e1e);border-radius:12px 12px 0 0;padding:28px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Squad Tech Solution · Admin</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Resource Download Lead</h1>
        </td></tr>

        <tr><td style="background:#ffffff;padding:36px 40px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
          <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">Someone just downloaded a resource from <strong style="color:#e73103;">squadtechsol.com</strong>.</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Email</p>
              <a href="mailto:${email}" style="font-size:15px;color:#e73103;font-weight:600;text-decoration:none;">${email}</a>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Resource Downloaded</p>
              <p style="margin:0;font-size:15px;color:#222;font-weight:600;">${resourceTitle}</p>
              <p style="margin:2px 0 0;font-size:12px;color:#aaa;">${slug}</p>
            </td></tr>
            <tr><td style="padding:12px 0;">
              <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999;">Timestamp</p>
              <p style="margin:0;font-size:14px;color:#555;">${timestamp}</p>
            </td></tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr><td align="center">
              <a href="mailto:${email}?subject=Following up on your Squad Tech download&body=Hi there,%0A%0AI noticed you downloaded our ${resourceTitle} — hoping it's useful!%0A%0AWould you be open to a quick 15-minute call to discuss how we could help implement this for your brand?%0A%0ABest,%0ASquad Tech Team" style="display:inline-block;background:linear-gradient(135deg,#e73103,#f58e1e);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;">Follow Up with Lead →</a>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:16px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#aaa;">Internal notification · Squad Tech Solution admin</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
