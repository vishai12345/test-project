const log = require("node-file-logger");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const MyCart = require("../models/myCart.model");
const msg = require("../utility/messages");
const logConfig = require("../config/log.config");
log.SetUserOptions(logConfig);

module.exports.addToCart = (req, res) => {
	const newProduct = new MyCart({
		productId: req.body.productId,
		userId: req.authData._id
	});
	newProduct.save().then(() => { 
			log.Info(msg.ProductAdded, "myCart-addToCart", "POST-1");
			return res.json({ success: true, message: msg.ProductAdded});
		}).catch( err => {
			log.Error(msg.Broken, "myCart-addToCart", "POST-2", err);
			return res.status(500).json({ success: false, error: msg.Broken});
		});
};

module.exports.myCartList = (req, res) => {
	var page = req.query.page ? req.query.page : 1;
	var limit = req.query.limit ? req.query.limit : 1000000;
	var skip = (page * limit ) - limit;

	var query = {
		$match : { userId : ObjectId(req.authData._id) }
	};
	MyCart.aggregate([
		query,
		{ $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
		{ $unwind: "$product" }, 
		{
			$project: {
			"_id": 1,
			"product": {
					"_id": 1,
					"name": 2,
					"imageUrl": 3,
					"price": 4
				},
			"createdAt": 2,
			"updatedAt": 3
			}
		},
		{
			$facet: {
				data: [{ $skip: parseInt(skip) }, { $limit: parseInt(limit) }],
				totalCount: [ { $count: 'total' } ]
			}
		}
	]).then(result => {
		var products = result[0].data[0] ? result[0].data[0] : [];
			var total = result[0].totalCount[0].total;
            log.Info(msg.ProductList, "myCart-myCartList", "GET-1");
			return res.json({ success: true, message: msg.ProductList, total, products});
        }).catch( err => {
            log.Error(msg.Broken, "myCart-myCartList", "GET-2", err);
			return res.status(500).json({ success: false, error: msg.Broken});
        });
};
