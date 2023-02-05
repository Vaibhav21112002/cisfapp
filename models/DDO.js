const mongoose = require("mongoose");

const DDOSchema = new mongoose.Schema({
	code :{
		type : Number
	},
	nameEng: {
		type: String,
	},

	nameHindi: {
		type: String,
	},

	division: {
		type: String,
	},
});

module.exports = mongoose.model("DDO", DDOSchema);
