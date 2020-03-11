const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const myProductsSchema = new mongoose.Schema({

	userId     : { type : mongoose.Schema.Types.ObjectId, ref: "user", required : true },
	productId  : { type : mongoose.Schema.Types.ObjectId, ref: "product", required : true },
	transection : {
		transectionId : { type : String, required : true },
		amount        : { type : Number, required : true },
	},
	createdAt : { type : Date, default : Date.now },
	updatedAt : { type : Date, default : Date.now }

});

myProductsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("myproducts", myProductsSchema);
