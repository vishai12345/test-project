var mongoose = require("mongoose");

module.exports.connect = () => {
	mongoose.connect("mongodb://localhost:27017/shoping", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if (!err) {
			console.log("we're connected!");
		} else {
			console.log("Unable to connect to database", err);
		}
	});
};
