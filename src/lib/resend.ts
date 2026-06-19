import { Resend } from "resend";
import { getProductBySlug } from "@/data/products";

// Retrieve environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER || "towseef.er420@gmail.com";

// Initialize Resend
const resend = new Resend(RESEND_API_KEY);

export interface ContactNotificationPayload {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
}

/**
 * Sends a notification email with form details to the configured company receiver using Resend.
 */
export async function sendContactNotification(payload: ContactNotificationPayload): Promise<void> {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  const subjectLabel = getSubjectLabel(payload.subject);
  const emailHtml = getEmailTemplate(payload, subjectLabel);

  // Note: For Resend free tier/unverified domains, sending from onboarding@resend.dev
  // to the registered account owner (CONTACT_RECEIVER) is fully supported out of the box.
  const { error } = await resend.emails.send({
    from: "Miraco Biocare Contact Form <onboarding@resend.dev>",
    to: CONTACT_RECEIVER,
    replyTo: payload.email,
    subject: "New Contact Form Submission",
    html: emailHtml,
    text: `New contact form submission received.
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Organization: ${payload.organization}
Subject: ${subjectLabel}
Message: ${payload.message}
`,
  });

  if (error) {
    console.error("Resend API Error details:", error);
    throw new Error(error.message || "Failed to send email via Resend.");
  }
}

/**
 * Helper to map subject values to readable labels.
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
 * HTML content template for the notification email
 */
function getEmailTemplate(payload: ContactNotificationPayload, subjectLabel: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background-color: #0057b8; color: #ffffff; padding: 24px; text-align: left; }
        .header h2 { margin: 0; font-size: 20px; font-weight: 600; }
        .content { padding: 24px; }
        .field-group { margin-bottom: 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 15px; }
        .field-group:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px; }
        .value { font-size: 16px; color: #1f2937; line-height: 1.5; }
        .message-box { background-color: #f9fafb; border-left: 4px solid #009fe3; padding: 12px 16px; font-style: italic; border-radius: 0 4px 4px 0; margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
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
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends a confirmation email to the customer using Resend.
 * Under Resend free tier restrictions, if the recipient is not the account owner (CONTACT_RECEIVER),
 * it redirects the email to the owner with a notice to allow testing.
 */
export async function sendCustomerConfirmation(name: string, email: string): Promise<void> {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  // Check if we need to redirect the email to the registered account owner for testing
  const toAddress = email.toLowerCase() === CONTACT_RECEIVER.toLowerCase()
    ? email
    : CONTACT_RECEIVER;

  const isRedirected = toAddress.toLowerCase() !== email.toLowerCase();
  const subjectLine = isRedirected
    ? `[Test Redirect to: ${email}] Thank You for Contacting Us`
    : "Thank You for Contacting Us";

  const { error } = await resend.emails.send({
    from: "Miraco Biocare <onboarding@resend.dev>",
    to: toAddress,
    subject: subjectLine,
    html: getCustomerHtmlTemplate(name, isRedirected ? email : undefined),
    text: `Dear ${name},

Thank you for contacting us.

We have successfully received your inquiry and our team will review it shortly.

We will get back to you as soon as possible.

Best Regards,
Miraco Biocare Team
${isRedirected ? `\n[Testing Note: This email was redirected from your customer's email: ${email} due to Resend sandbox restrictions]` : ""}
`,
  });

  if (error) {
    console.error("Resend API Error (Customer Confirmation):", error);
    throw new Error(error.message || "Failed to send customer confirmation email via Resend.");
  }
}

/**
 * HTML content template for the customer confirmation email
 */
function getCustomerHtmlTemplate(name: string, redirectedFrom?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You for Contacting Us</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1f2937; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; }
        .brand-strip { height: 4px; background: linear-gradient(90deg, #0057b8 0%, #009fe3 50%, #00b67a 100%); }
        .header { padding: 24px; text-align: left; }
        .logo-text { font-size: 20px; font-weight: 700; color: #0057b8; margin: 0; }
        .logo-sub { font-size: 9px; color: #00b67a; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin: 2px 0 0 0; }
        .content { padding: 24px; line-height: 1.6; font-size: 15px; }
        .welcome-title { font-size: 18px; font-weight: 700; color: #1f2937; margin-top: 0; margin-bottom: 16px; }
        .footer { background-color: #f9fafb; padding: 20px 24px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
        .test-banner { background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; color: #b45309; padding: 12px; border-radius: 4px; font-size: 13px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="brand-strip"></div>
        <div class="header">
          <div class="logo-text">MIRACO BIOCARE</div>
          <div class="logo-sub">Private Limited</div>
        </div>
        <div class="content">
          ${redirectedFrom ? `
            <div class="test-banner">
              <strong>Sandbox Testing Notice:</strong> This customer auto-reply email is copy-delivered to you because the recipient address (<strong>${escapeHtml(redirectedFrom)}</strong>) is not verified on your Resend dashboard. Verify your domain at <a href="https://resend.com/domains" target="_blank" style="color: #0057b8; text-decoration: underline;">resend.com/domains</a> to deliver to actual recipients.
            </div>
          ` : ""}
          <h3 class="welcome-title">Thank You for Contacting Us</h3>
          <p>Dear ${escapeHtml(name)},</p>
          <p>Thank you for contacting us.</p>
          <p>We have successfully received your inquiry and our team will review it shortly.</p>
          <p>We will get back to you as soon as possible.</p>
          <p style="margin-top: 24px; margin-bottom: 0;">
            Best Regards,<br>
            <strong>Miraco Biocare Team</strong>
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Miraco Biocare Private Limited. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends a notification email with quote request details to the administrator using Resend.
 */
export async function sendQuoteNotification(payload: QuoteNotificationPayload): Promise<void> {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  const emailHtml = getQuoteNotificationTemplate(payload);

  const { error } = await resend.emails.send({
    from: "Miraco Biocare Quote Request <onboarding@resend.dev>",
    to: CONTACT_RECEIVER,
    replyTo: payload.email,
    subject: "New Quote Request Submission",
    html: emailHtml,
    text: `New quote request received.
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Organization: ${payload.organization}
Designation: ${payload.designation || "N/A"}
Address: ${payload.address}, ${payload.city}, ${payload.state} - ${payload.pincode}
Products:
${payload.products
  .map((p) => {
    const prod = getProductBySlug(p.product);
    return `- ${prod ? prod.name : p.product} (Qty: ${p.quantity})`;
  })
  .join("\n")}
Notes: ${payload.notes || "None"}
`,
  });

  if (error) {
    console.error("Resend API Error (Quote Notification):", error);
    throw new Error(error.message || "Failed to send quote request notification via Resend.");
  }
}

/**
 * Sends a confirmation email to the customer for their quote request using Resend.
 * Under Resend free tier restrictions, if the recipient is not the account owner (CONTACT_RECEIVER),
 * it redirects the email to the owner with a notice to allow testing.
 */
export async function sendQuoteConfirmation(name: string, email: string): Promise<void> {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  const toAddress = email.toLowerCase() === CONTACT_RECEIVER.toLowerCase()
    ? email
    : CONTACT_RECEIVER;

  const isRedirected = toAddress.toLowerCase() !== email.toLowerCase();
  const subjectLine = isRedirected
    ? `[Test Redirect to: ${email}] Quote Request Received`
    : "Quote Request Received";

  const { error } = await resend.emails.send({
    from: "Miraco Biocare <onboarding@resend.dev>",
    to: toAddress,
    subject: subjectLine,
    html: getQuoteConfirmationTemplate(name, isRedirected ? email : undefined),
    text: `Dear ${name},

Thank you for requesting a quotation.

We have successfully received your request and our team will review it shortly.

We will get back to you with the quotation as soon as possible.

Best Regards,
Miraco Biocare Team
${isRedirected ? `\n[Testing Note: This email was redirected from your customer's email: ${email} due to Resend sandbox restrictions]` : ""}
`,
  });

  if (error) {
    console.error("Resend API Error (Quote Confirmation):", error);
    throw new Error(error.message || "Failed to send quote confirmation email via Resend.");
  }
}

export interface QuoteNotificationPayload {
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  products: { product: string; quantity: number }[];
  notes?: string;
}

/**
 * HTML content template for the Quote Notification email
 */
function getQuoteNotificationTemplate(payload: QuoteNotificationPayload): string {
  const productsListHtml = payload.products
    .map((p) => {
      const prod = getProductBySlug(p.product);
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><strong>${escapeHtml(prod ? prod.name : p.product)}</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-family: monospace;">${escapeHtml(p.product)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937; text-align: center;"><strong>${p.quantity}</strong></td>
        </tr>
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Quote Request Submission</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
        .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background-color: #0057b8; color: #ffffff; padding: 24px; text-align: left; }
        .header h2 { margin: 0; font-size: 20px; font-weight: 600; }
        .content { padding: 24px; }
        .section-title { font-size: 14px; font-weight: 700; color: #0057b8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px; }
        .field-group { margin-bottom: 16px; display: inline-block; width: 48%; vertical-align: top; }
        .field-group.full { width: 100%; border-top: 1px solid #f3f4f6; padding-top: 12px; }
        .label { font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 2px; }
        .value { font-size: 15px; color: #1f2937; line-height: 1.4; }
        .products-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
        .products-table th { background-color: #f8fafc; padding: 10px; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 700; text-align: left; border-bottom: 2px solid #e5e7eb; }
        .message-box { background-color: #f9fafb; border-left: 4px solid #009fe3; padding: 12px 16px; font-style: italic; border-radius: 0 4px 4px 0; margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Quote Request Submission</h2>
        </div>
        <div class="content">
          <div class="section-title">Customer details</div>
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
            <div class="label">Designation</div>
            <div class="value">${escapeHtml(payload.designation || "N/A")}</div>
          </div>
          <div class="field-group">
            <div class="label">Location</div>
            <div class="value">${escapeHtml(payload.address)}, ${escapeHtml(payload.city)}, ${escapeHtml(payload.state)} - ${escapeHtml(payload.pincode)}</div>
          </div>

          <div class="section-title" style="margin-top: 24px;">Selected Products</div>
          <table class="products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Slug</th>
                <th style="text-align: center; width: 80px;">Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${productsListHtml}
            </tbody>
          </table>

          <div class="field-group full">
            <div class="label">Additional Notes</div>
            <div class="value message-box">${escapeHtml(payload.notes || "None").replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * HTML content template for the customer quote confirmation email
 */
function getQuoteConfirmationTemplate(name: string, redirectedFrom?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Quote Request Received</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1f2937; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; }
        .brand-strip { height: 4px; background: linear-gradient(90deg, #0057b8 0%, #009fe3 50%, #00b67a 100%); }
        .header { padding: 24px; text-align: left; }
        .logo-text { font-size: 20px; font-weight: 700; color: #0057b8; margin: 0; }
        .logo-sub { font-size: 9px; color: #00b67a; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin: 2px 0 0 0; }
        .content { padding: 24px; line-height: 1.6; font-size: 15px; }
        .welcome-title { font-size: 18px; font-weight: 700; color: #1f2937; margin-top: 0; margin-bottom: 16px; }
        .footer { background-color: #f9fafb; padding: 20px 24px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
        .test-banner { background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; color: #b45309; padding: 12px; border-radius: 4px; font-size: 13px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="brand-strip"></div>
        <div class="header">
          <div class="logo-text">MIRACO BIOCARE</div>
          <div class="logo-sub">Private Limited</div>
        </div>
        <div class="content">
          ${redirectedFrom ? `
            <div class="test-banner">
              <strong>Sandbox Testing Notice:</strong> This customer confirmation email is copy-delivered to you because the recipient address (<strong>${escapeHtml(redirectedFrom)}</strong>) is not verified on your Resend dashboard. Verify your domain at <a href="https://resend.com/domains" target="_blank" style="color: #0057b8; text-decoration: underline;">resend.com/domains</a> to deliver to actual recipients.
            </div>
          ` : ""}
          <h3 class="welcome-title">Quote Request Received</h3>
          <p>Dear ${escapeHtml(name)},</p>
          <p>Thank you for requesting a quotation.</p>
          <p>We have successfully received your request and our team will review it shortly.</p>
          <p>We will get back to you with the quotation as soon as possible.</p>
          <p style="margin-top: 24px; margin-bottom: 0;">
            Best Regards,<br>
            <strong>Miraco Biocare Team</strong>
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Miraco Biocare Private Limited. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Escapes HTML characters to prevent rendering problems in mail layouts
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
