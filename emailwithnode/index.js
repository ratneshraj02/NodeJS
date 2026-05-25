import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Generate the password
/*
    Go to your Google Account.
    Select Security.
    Under "Signing in to Google," select App Passwords. You may need to sign in. ...
    At the bottom, choose Select app and choose the app you using Select device and choose the device you're using. ...
    Follow the instructions to enter the App Password. ...
    Tap Done.
 */

    
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'rk02ratnesh@gmail.com',
		pass: process.env.PASS,
	},
});

let mailOption = {
	from: 'rk02ratnesh@gmail.com',
	to: 'rk02ratnesh@gmail.com',
	subject: 'Sending email using NodeJS',
	text: 'This is the Node',
};

transporter.sendMail(mailOption, (err, info) => {
	if (err) console.log(err);
	else {
		console.log(`Email sent :${info.response}`);
	}
});
