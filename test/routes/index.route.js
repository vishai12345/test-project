const Router = require("express").Router();

module.exports = () => {

	Router.use("/user", require("./user.route"));
	Router.use("/product", require("./product.route"));
	Router.use("/my-cart", require("./myCart.route"));
	Router.use("/myp-roduct", require("./myProducts.route"));

	return Router;

};
