const Router = require("express").Router();
const Product = require("../controllers/product.controller");
const Auth = require("../middlewares/auth.middleware");
const Valid = require("../middlewares/product.validation");

Router.get("/", Auth.verifyToken, Auth.isValidUser, Product.productList);
Router.post("/buy-product", Auth.verifyToken, Auth.isValidUser, Valid.buyProductForm, Product.buyProduct);

module.exports = Router;