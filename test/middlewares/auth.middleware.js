const jwt = require("jsonwebtoken");
const msg = require("../utility/messages");
const User = require("../models/user.model");
// Verify User Token

module.exports.verifyToken = function(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers["authorization"];
	// Check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		// Split at the space
		const bearer = bearerHeader.split(" ");
		// Get token from array
		const bearerToken = bearer[1];
		// Set the token
		req.token = bearerToken;
		// Next middleware
		next();
	} else {
		// Forbidden
		return res.status(403).json({ success: false, error: msg.AuthFail });
	}
},

// Check User is Valid Or Not
module.exports.isValidUser = function(req, res, next) {
	jwt.verify(req.token, process.env.JWT_AUTHTOKEN_SECRET, (err, authData) => {
		if (err || !authData) {
			return res.status(401).json({ success: false, error: msg.AuthFail });
		} else {
			var query = {
				_id : authData._id,
				email : authData.email,
				password : authData.secret
			};
			User.findOne(query, (err, result) => {
				if (err || !result) {
					return res.status(401).json({ success: false, error: msg.AuthFail });
				} else {
					req.authData = authData;
					next();
				}
			});
		}
	});
};

// Validate reset password tokenm
module.exports.validateResetPwdToken = function(req, res, next) {
	jwt.verify(req.params.token, process.env.JWT_AUTHTOKEN_SECRET, (err, authData) => {
		if (err || !authData) {
			return res.status(401).json({ success: false, error: msg.InvalidToken });
		} else {
			var query = {
				_id : authData._id,
				email : authData.email,
				password : authData.secret
			};
			User.findOne(query, (err, result) => {
				if (err || !result) {
					return res.status(401).json({ success: false, error: msg.InvalidToken });
				} else {
					req.authData = authData;
					next();
				}
			});
		}
	});
};
