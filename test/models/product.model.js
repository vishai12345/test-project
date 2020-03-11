const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({

	name      : { type : String, required : true, trim: true },
	imageUrl  : { type : String, required : true, trim: true, lowercase: true },
	price  : { type : String, required : true, trim: true },
	createdAt : { type : Date, default : Date.now },
	updatedAt : { type : Date, default : Date.now }

});

productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("products", productSchema);
