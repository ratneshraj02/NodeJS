import nodemailer from 'nodemailer';

// Shared email container wrapper for consistent branding
const emailWrapper = (title, content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f7; padding: 40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; background-color: #ffffff;">
                            <h1 style="margin: 0; color: #111827; font-size: 24px; font-weight: 700;">${title}</h1>
                        </td>
                    </tr>
                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 20px 40px 40px 40px; color: #4b5563; font-size: 16px; line-height: 24px;">
                            ${content}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #f9fafb; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0;">If you didn't request this, you can safely ignore this email.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

const sendVerifyHTML = function (url) {
    const content = `
        <p style="margin-top: 0;">Hi there,</p>
        <p>Thanks for getting started with us! Please click the button below to verify your email address and activate your account.</p>
        
        <!-- Button -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
            <tr>
                <td align="center" style="border-radius: 6px; background-color: #4f46e5;">
                    <a href="${url}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; border: 1px solid #4f46e5; display: inline-block; font-weight: 600;">Verify Email Address</a>
                </td>
            </tr>
        </table>
        
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">This verification link will expire in <strong>15 minutes</strong>.</p>
    `;
    return emailWrapper('Verify Your Email', content);
};

const sendResetPasswordHTML = function (url) {
    const content = `
        <p style="margin-top: 0;">Hello,</p>
        <p>We received a request to reset your password. Click the button below to choose a new password.</p>
        
        <!-- Button -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
            <tr>
                <td align="center" style="border-radius: 6px; background-color: #4f46e5;">
                    <a href="${url}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; border: 1px solid #4f46e5; display: inline-block; font-weight: 600;">Reset Password</a>
                </td>
            </tr>
        </table>
        
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">This password reset link will expire in <strong>15 minutes</strong>.</p>
    `;
    return emailWrapper('Reset Your Password', content);
};

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 567,
	secure : false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

const sendEmail = async (to, subject, html) => {
	await transporter.sendMail({
		from: `${process.env.SMTP_FROM_EMAIL} <${process.env.SMTP_FROM_EMAIL}>`,
		to,
		subject,
		html,
	});

};

const sendVerificationEmail = async (email, token) => {
	const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
	await sendEmail(email, 'Verify you email', sendVerifyHTML(url));
};

const sendResetPasswordEmail = async (email, order) => {
	const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
	await sendEmail(email, 'Reset Your password', sendResetPasswordHTML(url));
};

const sendOrderConfirmationEmail = async (email, order) => {
	const items = order.items
		.map((i) => `<li>${i.title} x${i.quantity} — ₹${i.price}</li>`)
		.join('');

	await sendEmail(
		email,
		`Order Confirmed — ${order.orderNumber}`,
		`<h2>Order Confirmed!</h2>
     	<p>Order: ${order.orderNumber}</p>
     	<ul>${items}</ul>
     	<p><strong>Total: ₹${order.totalAmount}</strong></p>`,
	);
};

export {
	sendVerificationEmail,
	sendResetPasswordEmail,
	sendOrderConfirmationEmail,
};
