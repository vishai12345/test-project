const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const myCartSchema = new mongoose.Schema({

	userId     : { type : mongoose.Types.ObjectId, ref: "user", required : true },
	productId  : { type : mongoose.Types.ObjectId, ref: "product", required : true },
	createdAt : { type : Date, default : Date.now },
	updatedAt : { type : Date, default : Date.now }

});

myCartSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("mycarts", myCartSchema);
