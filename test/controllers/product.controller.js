const log = require("node-file-logger");
const Product = require("../models/product.model");
const MyCart = require("../models/myCart.model");
const msg = require("../utility/messages");
const logConfig = require("../config/log.config");
log.SetUserOptions(logConfig);

module.exports.productList = (req, res) => {
	var page = req.query.page ? req.query.page : 1;
	var limit = req.query.limit ? req.query.limit : 1000000;
	var skip = (page * limit ) - limit;
	
	var options = {
		offset: Number(skip),
		limit: Number(limit)
	};
	
	Product.paginate({}, options).then(result => { 
			var products = result.docs;
			var total = result.totalDocs;
            log.Info(msg.ProductList, "product-ProductList", "POST-1");
			return res.json({ success: true, message: msg.ProductList, total, products});
        }).catch( err => {
            log.Error(msg.Broken, "product-ProductList", "POST-1", err);
			return res.status(500).json({ success: false, error: msg.Broken});
        });
};

module.exports.buyProduct = (req, res) => {
	const newProduct = new User({
		userId: req.authData._id,
		productId: req.body.productId,
		transection: {
			transectionId: req.body.transectionId,
			amount: req.body.amount
		}
	});
	newProduct.save().then(() => {
			if(req.body.myCartId){
				MyCart.findOneAndDelete({ _id: ObjectId(req.body.myCartId) }).then(result=>{
					log.Info(msg.DeletedFromMyCart, "product-buyProduct", "POST-1");
				}).catch(err=>{
					log.Error(msg.Broken, "product-buyProduct", "POST-2", err);
				});
			}
			log.Info(msg.newProduct, "product-buyProduct", "POST-3");
			return res.json({ success: true, message: msg.newProduct});
        }).catch( err => {
            log.Error(msg.Broken, "product-buyProduct", "POST-4", err);
			return res.status(500).json({ success: false, error: msg.Broken});
        });
};
