import nodemailer from "nodemailer";

// Retrieve environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER;

// Fallbacks for hosting settings
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "465", 10);
const EMAIL_SECURE = process.env.EMAIL_SECURE !== "false";

// Create nodemailer transporter
// Using pool configuration for efficiency since we are sending two emails sequentially
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  pool: true, // Reuse SMTP connections
});

export interface EmailPayload {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
}

/**
 * Sends a notification email to the company inbox and an auto-reply to the customer.
 */
export async function sendContactEmails(payload: EmailPayload): Promise<void> {
  if (!EMAIL_USER || !EMAIL_PASSWORD || !CONTACT_RECEIVER) {
    throw new Error(
      "Missing email configuration environment variables (EMAIL_USER, EMAIL_PASSWORD, or CONTACT_RECEIVER)."
    );
  }

  // Format the subject to be human-readable
  const subjectDisplay = getSubjectLabel(payload.subject);

  // Send Notification Email to Company
  const companyEmailHtml = getCompanyNotificationTemplate(payload, subjectDisplay);
  const companyMailOptions = {
    from: `"${payload.name} via Miraco Biocare" <${EMAIL_USER}>`,
    to: CONTACT_RECEIVER,
    replyTo: payload.email,
    subject: `[New Inquiry] ${subjectDisplay} - ${payload.name}`,
    html: companyEmailHtml,
    text: `New contact form submission received.
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Organization: ${payload.organization}
Subject: ${subjectDisplay}
Message: ${payload.message}
`,
  };

  // Send Auto-Reply Email to Customer
  const customerEmailHtml = getCustomerAutoReplyTemplate(payload, subjectDisplay);
  const customerMailOptions = {
    from: `"Miraco Biocare" <${EMAIL_USER}>`,
    to: payload.email,
    subject: `We have received your inquiry - Miraco Biocare`,
    html: customerEmailHtml,
    text: `Dear ${payload.name},

Thank you for reaching out to Miraco Biocare Private Limited. We have received your inquiry regarding "${subjectDisplay}" and our team is currently reviewing it. We will get back to you as soon as possible.

Here is a summary of the details we received:
- Organization: ${payload.organization}
- Subject: ${subjectDisplay}
- Message: ${payload.message}

Best regards,
The Miraco Biocare Team
www.miracobiocare.com
`,
  };

  // Run both email operations concurrently
  await Promise.all([
    transporter.sendMail(companyMailOptions),
    transporter.sendMail(customerMailOptions),
  ]);
}

/**
 * Returns a user-friendly label for the subject value.
 */
function getSubjectLabel(subject: string): string {
  const subjectsMap: Record<string, string> = {
    general: "General Inquiry",
    products: "Product Information",
    quotation: "Request Quotation",
    support: "Technical Support",
    partnership: "Partnership",
  };
  return subjectsMap[subject] || subject;
}

/**
 * HTML template for the Company Notification email
 */
function getCompanyNotificationTemplate(payload: EmailPayload, subjectLabel: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Website Inquiry</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background-color: #0057b8; color: #ffffff; padding: 24px; text-align: left; }
        .header h2 { margin: 0; font-size: 22px; font-weight: 600; }
        .content { padding: 24px; }
        .field-group { margin-bottom: 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 15px; }
        .field-group:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px; }
        .value { font-size: 16px; color: #1f2937; line-height: 1.5; }
        .message-box { background-color: #f9fafb; border-left: 4px solid #009fe3; padding: 12px 16px; font-style: italic; border-radius: 0 4px 4px 0; margin-top: 5px; }
        .footer { background-color: #f9fafb; padding: 16px 24px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Inquiry Received</h2>
        </div>
        <div class="content">
          <div class="field-group">
            <div class="label">Full Name</div>
            <div class="value">${escapeHtml(payload.name)}</div>
          </div>
          <div class="field-group">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${escapeHtml(payload.email)}" style="color: #0057b8; text-decoration: none;">${escapeHtml(payload.email)}</a></div>
          </div>
          <div class="field-group">
            <div class="label">Phone Number</div>
            <div class="value"><a href="tel:${escapeHtml(payload.phone)}" style="color: #0057b8; text-decoration: none;">${escapeHtml(payload.phone)}</a></div>
          </div>
          <div class="field-group">
            <div class="label">Organization</div>
            <div class="value">${escapeHtml(payload.organization)}</div>
          </div>
          <div class="field-group">
            <div class="label">Subject</div>
            <div class="value">${escapeHtml(subjectLabel)}</div>
          </div>
          <div class="field-group">
            <div class="label">Message</div>
            <div class="value message-box">${escapeHtml(payload.message).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          This inquiry was sent from the contact form on Miraco Biocare website.
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * HTML template for the Customer Auto-Reply confirmation email (Premium Branding)
 */
function getCustomerAutoReplyTemplate(payload: EmailPayload, subjectLabel: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You - Miraco Biocare</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .email-wrapper { width: 100%; background-color: #f8fafc; padding: 32px 16px; box-sizing: border-box; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 87, 184, 0.05), 0 4px 6px -4px rgba(0, 87, 184, 0.05); border: 1px solid #e5e7eb; }
        .brand-strip { height: 4px; background: linear-gradient(90deg, #0057b8 0%, #009fe3 50%, #00b67a 100%); }
        .header { padding: 32px 32px 24px; text-align: left; }
        .logo-text { font-size: 24px; font-weight: 800; color: #0057b8; margin: 0; letter-spacing: -0.02em; }
        .logo-sub { font-size: 10px; color: #00b67a; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin: 2px 0 0 0; }
        .content { padding: 0 32px 32px; color: #1f2937; line-height: 1.6; }
        .welcome-title { font-size: 20px; font-weight: 700; color: #1f2937; margin-top: 0; margin-bottom: 16px; }
        .message-intro { font-size: 15px; color: #4b5563; margin-bottom: 24px; }
        .summary-card { background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
        .summary-title { font-size: 14px; font-weight: 700; color: #0057b8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0; margin-bottom: 12px; }
        .summary-row { margin-bottom: 8px; font-size: 14px; }
        .summary-row:last-child { margin-bottom: 0; }
        .summary-label { font-weight: 600; color: #4b5563; }
        .summary-val { color: #1f2937; }
        .summary-message { background-color: #ffffff; border-left: 3px solid #00b67a; padding: 10px 14px; font-style: italic; border-radius: 0 4px 4px 0; margin-top: 8px; font-size: 13px; color: #4b5563; }
        .cta-note { font-size: 14px; color: #4b5563; margin-bottom: 0; }
        .footer { background-color: #0b1120; color: #94a3b8; padding: 32px; text-align: center; border-top: 1px solid #1e2d4a; font-size: 13px; }
        .footer-logo { font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 8px; }
        .footer-tagline { font-size: 11px; color: #00b67a; margin-bottom: 16px; font-weight: 600; }
        .footer-info { line-height: 1.8; margin-bottom: 16px; }
        .footer-info a { color: #009fe3; text-decoration: none; }
        .footer-info a:hover { text-decoration: underline; }
        .footer-copy { font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 16px; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="container">
          <div class="brand-strip"></div>
          <div class="header">
            <div class="logo-text">MIRACO BIOCARE</div>
            <div class="logo-sub">Private Limited</div>
          </div>
          <div class="content">
            <h3 class="welcome-title">Thank you for reaching out</h3>
            <p class="message-intro">
              Dear ${escapeHtml(payload.name)},<br><br>
              We have received your message regarding <strong>${escapeHtml(subjectLabel)}</strong>. Our team is reviewing the details of your inquiry and we will get back to you as soon as possible.
            </p>
            
            <div class="summary-card">
              <div class="summary-title">Inquiry Details</div>
              <div class="summary-row">
                <span class="summary-label">Organization:</span>
                <span class="summary-val">${escapeHtml(payload.organization)}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Subject:</span>
                <span class="summary-val">${escapeHtml(subjectLabel)}</span>
              </div>
              <div class="summary-row" style="margin-top: 12px;">
                <span class="summary-label">Your Message:</span>
                <div class="summary-message">${escapeHtml(payload.message).replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            
            <p class="cta-note">
              If you have any urgent queries, please call us directly at <strong>+91 95962 41023</strong>.
            </p>
          </div>
          
          <div class="footer">
            <div class="footer-logo">Miraco Biocare Private Limited</div>
            <div class="footer-tagline">Innovating Diagnostics. Advancing Research. Improving Lives.</div>
            <div class="footer-info">
              <strong>Address:</strong> Bohlochipora, Soura, Srinagar, Jammu & Kashmir, India – 190011<br>
              <strong>Phone:</strong> +91 95962 41023, +91 81788 82335<br>
              <strong>Email:</strong> <a href="mailto:info@miracobiocare.com">info@miracobiocare.com</a><br>
              <strong>Website:</strong> <a href="https://www.miracobiocare.com" target="_blank">www.miracobiocare.com</a>
            </div>
            <div class="footer-copy">
              &copy; ${new Date().getFullYear()} Miraco Biocare Private Limited. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Escapes HTML characters to prevent XSS in email layouts
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
