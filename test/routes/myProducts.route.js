const Router = require("express").Router();
const myProduct = require("../controllers/myProducts.controller");
const Auth = require("../middlewares/auth.middleware");

Router.get("/",  Auth.verifyToken, Auth.isValidUser, myProduct.myProductList);

module.exports = Router;