/* eslint-disable no-unused-vars */
const path = require("path");
const log = require("node-file-logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const msg = require("../utility/messages");
const logConfig = require("../config/log.config");
const mail = require("../utility/email");
log.SetUserOptions(logConfig);

// User object for token
var getTokenObject = (user) => {
	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		secret: user.password
	};
};

module.exports.emailCheck = (req, res, next) => {
	const query = {
		email: req.body.email
	};
	User.findOne(query).then( user => {
		if(user){
			log.Info(msg.EmailInUse, "User-emailCheck", "POST-1");
			return res.status(409).json({ success: false, error: msg.EmailInUse});
		} else {
			next();
		}
	}).catch(err => {
		log.Error(msg.Broken, "User-emailCheck", "POST-2", err);
		return res.status(500).json({ success: false, error: msg.Broken });
	});
};

module.exports.signUp = (req, res) => {
    const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, Number(process.env.APP_PASSWORD_SOLT)),
	});
	newUser.save().then(() => { 
            log.Info(msg.RegDone, "User-signUp", "POST-1");
			return res.json({ success: true, message: msg.RegDone});
        }).catch( err => {
            log.Error(msg.Broken, "User-signUp", "POST-2", err);
			return res.status(500).json({ success: false, error: msg.Broken});
        });
};

module.exports.login = (req, res) => {
	const query = {
		email: req.body.email
	};
	User.findOne(query).then(user => {
        if(!user || !bcrypt.compareSync(req.body.password, user.password) ) {
			log.Info(msg.InvalidCredentials, "User-login", "POST-1");
			return res.status(401).json({ success: false, error: msg.InvalidCredentials });
        } else {
			var userObject = getTokenObject(user);
            // token creation
			var token = jwt.sign(userObject, process.env.JWT_AUTHTOKEN_SECRET, { expiresIn: "364d" });
            log.Info(msg.Login, "User-login", "POST-2");
			res.json({ success: true, message: msg.Login, token, user: userObject });
		}
	}).catch(err => {
		log.Error(msg.Broken, "User-login", "POST-3", err);
		return res.status(500).json({ success: false, error: msg.Broken });
	});
};


module.exports.forgotPassword = (req, res) => {
	const query = {
		email: req.body.email
	};
	User.findOne(query).then( user => {
		if(!user){
			log.Info(msg.InvalidEmail, "User-forgotPassword", "POST-1");
            return res.status(422).json({ success: false, error: msg.InvalidEmail });
        } else {
			var userObject = getTokenObject(user);
			var token = jwt.sign(userObject, process.env.JWT_AUTHTOKEN_SECRET, { expiresIn: "2d" });
			var content = "<p>Hello "+user.name+"<br><br>Click <a href='"+process.env.WEB_RESET_PWD_URL+token+"'>here</a> for reset password.</p>";
			mail.sendMail(content, user.email, "Reset password link", (err) => {
				if(err){
					log.Error(msg.ForgotPwddMailFailed, "User-login", "POST-2", err);
					return res.status(500).json({ success: false, error: msg.ForgotPwddMailFailed });
				} else {
					log.Info(msg.ForgotPwddMail, "User-forgotPassword", "POST-3");
					res.json({ success: true, message: msg.ForgotPwddMail });
				}
			});
        }
	}).catch(err => {
		log.Error(msg.Broken, "User-forgotPassword", "POST-4", err);
		return res.status(500).json({ success: false, error: msg.Broken });
	});
};

module.exports.resetPassword = (req, res) => {
	const query = {
		email: req.authData.email
	};
	const update = {
		password: bcrypt.hashSync(req.body.password, Number(process.env.APP_PASSWORD_SOLT))
	}
	User.findOneAndUpdate(query, update, { new: true }).then( user => {
		if(!user){
			log.Info(msg.InvalidToken, "User-resetPassword", "PUT-1");
			return res.status(422).json({ success: false, error: msg.InvalidToken });
		} else {
			var userObject = getTokenObject(user);
            // token creation
			var token = jwt.sign(userObject, process.env.JWT_AUTHTOKEN_SECRET, { expiresIn: "364d" });
			log.Info(msg.PassReset, "User-resetPassword", "PUT-2");
			res.json({ success: true, message: msg.PassReset, token, user: userObject });
		}
	}).catch(err => {
		log.Error(msg.Broken, "User-resetPassword", "PUT-3", err);
		return res.status(500).json({ success: false, error: msg.Broken });
	});
};
