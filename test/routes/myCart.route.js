const Router = require("express").Router();
const myCart = require("../controllers/myCart.controller");
const Valid = require("../middlewares/myCart.validation");
const Auth = require("../middlewares/auth.middleware");

Router.post("/", Auth.verifyToken, Auth.isValidUser, Valid.addToCartForm, myCart.addToCart);
Router.get("/",  Auth.verifyToken, Auth.isValidUser, myCart.myCartList);

module.exports = Router;