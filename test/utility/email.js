const mailConfig = require("../config/email.config");

module.exports = {
	sendMail: function(content, emailAddres, subject, callback) {
		var mailOptions = {
			from: process.env.APP_EMAIL_ADDRESS,
			to: emailAddres,
			subject: subject,
			html: "" + content + ""
		};
		mailConfig.transporter.sendMail(mailOptions, function(error) {
			if (error) {
				console.log(error, "error");
				callback(error);
			} else {
				console.log("success")
				callback(null);
			}
		});
	}
};
