const Validation = require("node-input-validator");

// Validation Rule for add to cart
module.exports.addToCartForm = function(req, res, next) {
	const validator = new Validation.Validator(req.body, {
        	productId: "required"
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
