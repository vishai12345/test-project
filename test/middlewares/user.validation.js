const Validation = require("node-input-validator");

// Validation Rule for signup
module.exports.signUpForm = function(req, res, next) {
	const validator = new Validation.Validator(req.body, {
        name: "required",
        email: "required|email",
        password: "required"
	});
	validator.check().then(function(matched) {
		if (matched) {
			next();
		} else {
			var newErrormsg = getFirstErrorMessage(validator);
			return res.status(422).json({ success: false, error: newErrormsg[0] || null });
		}
	});
};

// Validation Rule for login
module.exports.loginForm = function(req, res, next) {
	const validator = new Validation.Validator(req.body, {
        email: "required|email",
        password: "required"
	});
	validator.check().then(function(matched) {
		if (matched) {
			next();
		} else {
			var newErrormsg = getFirstErrorMessage(validator);
			return res.status(422).json({ success: false, error: newErrormsg[0] || null });
		}
	});
};

// Validation Rule for forgot password
module.exports.forgotPasswordForm = function(req, res, next) {
	const validator = new Validation.Validator(req.body, {
        email: "required|email"
	});
	validator.check().then(function(matched) {
		if (matched) {
			next();
		} else {
			var newErrormsg = getFirstErrorMessage(validator);
			return res.status(422).json({ success: false, error: newErrormsg[0] || null });
		}
	});
};

// Validation Rule for reset password
module.exports.resetPasswordForm = function(req, res, next) {
	const validator = new Validation.Validator(req.body, {
        password: "required"
	});
	validator.check().then(function(matched) {
		if (matched) {
			next();
		} else {
			var newErrormsg = getFirstErrorMessage(validator);
			return res.status(422).json({ success: false, error: newErrormsg[0] || null });
		}
	});
};

// Extract First Error Message
function getFirstErrorMessage(validator) {
	return Object.keys(validator.errors).map((key, index) => {
		if (index == 0) {
			var message = validator.errors[key].message.replace(key, (key.split(/(?=[A-Z])/).join(" ")).toLocaleLowerCase());
			return message;
		}
	});
}
