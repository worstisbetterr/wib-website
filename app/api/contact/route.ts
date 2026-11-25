import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const BTN_STYLE =
  "display:block;width:100%;box-sizing:border-box;background-color:#E62E30;background:#E62E30 linear-gradient(180deg,#E62E30 0%,#B8181A 100%);color:#FFFFFF;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;text-align:center;padding:16px 20px;border-radius:6px;box-shadow:0 4px 14px rgba(230,46,48,0.35);";

function wrapDarkEmailTemplate(contentHtml: string, eyebrow?: string, preheader?: string): string {
  const tag = eyebrow || "BRIEF INQUIRY";
  const preview = preheader || "Worstisbetterr — Directed AI Studio inquiry.";
  const logoUrl = "https://www.worstisbetterr.com/logos/wib_logo_typography_email.png";

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Worstisbetterr</title>
<!--[if mso]>
<noscript>
<xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
</noscript>
<![endif]-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root { color-scheme: light dark; supported-color-schemes: light dark; }
body, .wib-body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0A0908 !important; background: #0A0908 linear-gradient(180deg, #0A0908 0%, #0A0908 100%) !important; color: #D6D3CD !important; font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; }
.wib-card { background-color: #100F0D !important; background: #100F0D linear-gradient(180deg, #100F0D 0%, #100F0D 100%) !important; border: 1px solid #2A2824 !important; }
.wib-box { background-color: #140D0D !important; background: #140D0D linear-gradient(160deg, #171010 0%, #0F0E0D 100%) !important; border: 1px solid #2A2824 !important; }
[data-ogsc] body, [data-ogsb] body, [data-ogsc] .wib-body, [data-ogsb] .wib-body { background-color: #0A0908 !important; background: #0A0908 linear-gradient(180deg, #0A0908 0%, #0A0908 100%) !important; }
[data-ogsc] .wib-card, [data-ogsb] .wib-card { background-color: #100F0D !important; background: #100F0D linear-gradient(180deg, #100F0D 0%, #100F0D 100%) !important; }
[data-ogsc] .wib-box, [data-ogsb] .wib-box { background-color: #140D0D !important; background: #140D0D linear-gradient(160deg, #171010 0%, #0F0E0D 100%) !important; }
@media (prefers-color-scheme: dark) {
  body, .wib-body { background-color: #0A0908 !important; background: #0A0908 linear-gradient(180deg, #0A0908 0%, #0A0908 100%) !important; }
  .wib-card { background-color: #100F0D !important; background: #100F0D linear-gradient(180deg, #100F0D 0%, #100F0D 100%) !important; }
  .wib-box { background-color: #140D0D !important; background: #140D0D linear-gradient(160deg, #171010 0%, #0F0E0D 100%) !important; }
}
@media only screen and (max-width: 520px) {
  .card-outer-td { padding: 16px 10px !important; }
  .card-inner-td { padding: 24px 18px !important; }
  .hero-headline { font-size: 22px !important; }
  .header-logo { max-width: 140px !important; }
}
</style>
</head>
<body class="wib-body" style="margin:0;padding:0;width:100% !important;background-color:#0A0908;background:#0A0908 linear-gradient(180deg,#0A0908 0%,#0A0908 100%);color:#D6D3CD;font-family:'Ubuntu',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;font-size:1px;color:#0A0908;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
  ${preview} &#847; &zwnj; &nbsp; &#8199; &shy;
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0A0908;background:#0A0908 linear-gradient(180deg,#0A0908 0%,#0A0908 100%);margin:0;padding:0;border-collapse:collapse;">
  <tr>
    <td align="center" class="card-outer-td" style="padding:28px 14px;background-color:#0A0908;background:#0A0908 linear-gradient(180deg,#0A0908 0%,#0A0908 100%);">
      <!-- Obsidian Monolith Card Container -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="wib-card" style="max-width:560px;width:100%;background-color:#100F0D;background:#100F0D linear-gradient(180deg,#100F0D 0%,#100F0D 100%);border:1px solid #2A2824;border-radius:8px;overflow:hidden;box-shadow:0 0 45px rgba(230,46,48,0.12),0 20px 50px rgba(0,0,0,0.9);border-collapse:separate;">
        <!-- Top Ambient Crimson Light Bar -->
        <tr>
          <td height="3" style="height:3px;background-color:#E62E30;background:linear-gradient(90deg,#100F0D 0%,#E62E30 50%,#100F0D 100%);line-height:3px;font-size:1px;padding:0;margin:0;">&nbsp;</td>
        </tr>
        <tr>
          <td class="card-inner-td" style="padding:32px 28px;background-color:#100F0D;background:#100F0D linear-gradient(180deg,#100F0D 0%,#100F0D 100%);">
            <!-- Header Row -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;border-collapse:collapse;">
              <tr>
                <td align="left" style="vertical-align:middle;">
                  <a href="https://www.worstisbetterr.com" target="_blank" style="text-decoration:none;display:inline-block;"><img src="${logoUrl}" alt="WORSTISBETTERR" class="header-logo" width="150" height="21" border="0" style="width:150px;max-width:150px;height:auto;display:block;border:0;outline:none;text-decoration:none;" /></a>
                </td>
                <td align="right" style="vertical-align:middle;white-space:nowrap;padding-left:8px;">
                  <div style="display:inline-block;background-color:#140D0D;background:#140D0D linear-gradient(180deg,#140D0D 0%,#140D0D 100%);border:1px solid #E62E30;border-radius:20px;padding:5px 12px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#FFFFFF;letter-spacing:0.1em;text-transform:uppercase;">
                    <span style="display:inline-block;width:6px;height:6px;background-color:#E62E30;border-radius:50%;vertical-align:middle;margin-right:6px;box-shadow:0 0 6px #E62E30;"></span>${tag}
                  </div>
                </td>
              </tr>
            </table>

            ${contentHtml}

            <!-- Footer Section -->
            <div style="margin-top:28px;padding-top:18px;border-top:1px solid #1F1D1A;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#57534C;line-height:1.8;">
              WORSTISBETTERR · DIRECTED AI STUDIO · MUMBAI · GLOBAL<br>
              <a href="https://www.worstisbetterr.com" target="_blank" style="color:#8B877F;text-decoration:none;font-weight:bold;">worstisbetterr.com</a> · 
              <a href="https://instagram.com/worstisbetterr" target="_blank" style="color:#8B877F;text-decoration:none;">@worstisbetterr</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      phone,
      countryCode,
      brand,
      brandType,
      need,
      budgetRange,
      currency,
      timeline,
      source,
      briefDetails,
    } = data;

    if (!name || !email || !brand || !need) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fullPhone = phone ? `${countryCode || ""} ${phone}`.trim() : "Not provided";

    // 1. AGENCY NOTIFICATION EMAIL (SENT TO WORSTISBETTERR)
    const agencyContent = `
      <div style="margin-bottom:20px;">
        <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;font-weight:700;color:#E62E30;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">
          NEW CLIENT INQUIRY · ${(brandType || "DIRECT BRIEF").toUpperCase()}
        </div>
        <h1 class="hero-headline" style="margin:0 0 6px 0;font-size:26px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;font-family:'Ubuntu',sans-serif;line-height:1.2;">
          ${brand}
        </h1>
        <div style="font-size:14px;color:#8B877F;line-height:1.4;font-family:'Ubuntu',sans-serif;">
          ${name} &nbsp;·&nbsp; <a href="mailto:${email}" style="color:#E62E30;text-decoration:none;font-weight:500;">${email}</a>
        </div>
      </div>

      <!-- Scope Capsule -->
      <div class="wib-box" style="padding:16px 16px;background-color:#131210;background:#131210;border:1px solid #24221F;border-left:3px solid #E62E30;border-radius:6px;margin-bottom:22px;box-sizing:border-box;">
        <div style="font-size:18px;font-weight:700;color:#FFFFFF;margin-bottom:4px;font-family:'Ubuntu',sans-serif;">
          ${need}
        </div>
        <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F;margin-bottom:12px;">
          Timeline: ${timeline} &nbsp;·&nbsp; Budget: ${currency || "INR"} ${budgetRange || "Not specified"}
        </div>
        <div>
          <span style="display:inline-block;margin:2px 4px 2px 0;background:#0A0908;border:1px solid #1E1C1A;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#D6D3CD;">Phone: ${fullPhone}</span>
          <span style="display:inline-block;margin:2px 0 2px 0;background:#1A0D0E;border:1px solid #4D1A1C;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#FF4D4F;">Via: ${source}</span>
        </div>
      </div>

      <!-- Brief Dossier (Stacked Layout) -->
      <div style="margin-bottom:24px;">
        <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#8B877F;letter-spacing:0.14em;text-transform:uppercase;padding-bottom:6px;border-bottom:1px solid #1E1C1A;margin-bottom:10px;">
          PROJECT BRIEF &amp; GOALS
        </div>
        <div style="font-size:14px;color:#FFFFFF;line-height:1.6;white-space:pre-wrap;font-family:'Ubuntu',sans-serif;padding:8px 0;">
          ${briefDetails || "No additional brief details provided."}
        </div>
      </div>

      <!-- Action Button -->
      <div style="margin-bottom:20px;">
        <a href="mailto:${email}?subject=Re:%20WIB%20Project%20Inquiry%20—%20${encodeURIComponent(brand)}" target="_blank" style="${BTN_STYLE}">
          Reply Direct to ${name} ›
        </a>
      </div>
    `;

    // 2. CLIENT ACKNOWLEDGMENT EMAIL (SENT TO INQUIRING CLIENT)
    const clientContent = `
      <div style="margin-bottom:20px;">
        <h1 class="hero-headline" style="margin:0 0 6px 0;font-size:24px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;line-height:1.25;font-family:'Ubuntu',sans-serif;">
          We have received your brief.
        </h1>
        <p style="margin:0;font-size:14px;color:#8B877F;line-height:1.5;font-family:'Ubuntu',sans-serif;">
          Hi ${name}, thank you for reaching out to WORSTISBETTERR. We are reviewing your project brief for <strong style="color:#FFFFFF;">${brand}</strong>.
        </p>
      </div>

      <!-- Scope Capsule -->
      <div class="wib-box" style="padding:16px 16px;background-color:#131210;background:#131210;border:1px solid #24221F;border-left:3px solid #E62E30;border-radius:6px;margin-bottom:22px;box-sizing:border-box;">
        <div style="font-size:17px;font-weight:700;color:#FFFFFF;margin-bottom:2px;font-family:'Ubuntu',sans-serif;">
          ${need}
        </div>
        <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F;margin-bottom:12px;">
          Target timeline: ${timeline}
        </div>
        <div>
          <span style="display:inline-block;margin:2px 4px 2px 0;background:#0A0908;border:1px solid #1E1C1A;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#D6D3CD;">${email}</span>
          <span style="display:inline-block;margin:2px 0 2px 0;background:#1A0D0E;border:1px solid #4D1A1C;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#FF4D4F;">1 Business Day Review</span>
        </div>
      </div>

      <!-- What Happens Next -->
      <div style="border-top:1px solid #1A1816;padding-top:16px;margin-bottom:22px;">
        <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#8B877F;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">
          WHAT HAPPENS NEXT
        </div>
        <p style="margin:0 0 10px 0;font-size:13px;color:#D6D3CD;line-height:1.6;font-family:'Ubuntu',sans-serif;">
          Our creative directors examine every brief thoroughly to assess how Directed AI can elevate your visual fidelity, storytelling, and campaign goals.
        </p>
        <p style="margin:0;font-size:13px;color:#8B877F;line-height:1.6;font-family:'Ubuntu',sans-serif;">
          We will reply directly to your email within <strong style="color:#FFFFFF;">one business day</strong>.
        </p>
      </div>

      <!-- Showreel Button -->
      <div style="margin-bottom:20px;">
        <a href="https://www.worstisbetterr.com/work" target="_blank" style="${BTN_STYLE}">
          Explore Our Work ›
        </a>
      </div>
    `;

    const agencyEmailHtml = wrapDarkEmailTemplate(agencyContent, "BRIEF INQUIRY", `New brief received from ${name} (${brand})`);
    const clientEmailHtml = wrapDarkEmailTemplate(clientContent, "BRIEF RECEIVED", `We have received your brief for ${brand} — Worstisbetterr`);

    let primaryFrom = "WORSTISBETTERR <projects@worstisbetterr.com>";

    let agencyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: primaryFrom,
        to: ["worstisbetterr@gmail.com"],
        cc: ["pataniprameet@gmail.com"],
        reply_to: email,
        subject: `[WIB Brief Inquiry] ${brand} — ${name}`,
        html: agencyEmailHtml,
      }),
    });

    let agencyData = await agencyRes.json();

    if (!agencyRes.ok && agencyData?.name === "validation_error") {
      agencyRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "WORSTISBETTERR <onboarding@resend.dev>",
          to: ["worstisbetterr@gmail.com"],
          cc: ["pataniprameet@gmail.com"],
          reply_to: email,
          subject: `[WIB Brief Inquiry] ${brand} — ${name}`,
          html: agencyEmailHtml,
        }),
      });
      agencyData = await agencyRes.json();
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: primaryFrom,
        to: [email],
        subject: `Thank you for your project brief — WORSTISBETTERR (${brand})`,
        html: clientEmailHtml,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact brief via Resend:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
