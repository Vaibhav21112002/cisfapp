const mongoose = require("mongoose");

const DASchema = new mongoose.Schema({
	cisfNo: {
		type: Number,
	},
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	type: {
		type: String,
	},
});

module.exports = mongoose.model("DA", DASchema);
