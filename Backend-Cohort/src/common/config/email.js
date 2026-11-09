import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

const sendMail = async (to, subject, html) => {
	await transporter.sendMail({
		from: `${process.env.SMTP_FROM_EMAIL}`,
		to,
		subject,
		html,
	});
};

const sendVerificationEmail = async (email, token, html) => {
	await transporter.sendMail({
		from: `${process.env.SMTP_FROM_EMAIL}`,
		email,
		html,
	});
};

export { sendMail, sendVerificationEmail };
