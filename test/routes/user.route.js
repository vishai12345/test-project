const Router = require("express").Router();
const User = require("../controllers/user.controller");
const Valid = require("../middlewares/user.validation");

Router.post("/signup", Valid.signUpForm,  User.emailCheck, User.signUp);
Router.post("/login", Valid.loginForm, User.login);
Router.post("/forgot-password", Valid.forgotPasswordForm, User.forgotPassword);
Router.put("/reset-password",  Valid.resetPasswordForm, User.resetPassword);

module.exports = Router;