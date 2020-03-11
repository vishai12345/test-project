var nodemailer = require("nodemailer");

module.exports = {
	transporter: nodemailer.createTransport({
		host: process.env.APP_EMAIL_HOST,
		port: process.env.APP_EMAIL_PORT,
		auth: {
			user: process.env.APP_EMAIL_ADDRESS,
			pass: process.env.APP_EMAIL_PASSWORD
		},
		secure: false
	})
};
