const mongoose = require("mongoose");

const DiarySchema = new mongoose.Schema({
	serialNo: {
		type: Number,
	},
	serialNoDate: {
		type: Date,
	},
	from: {
		//ID OF DDO
		type: String,
	},
	subject: {
		type: String,
	},
	letterNo: {
		type: Number,
	},
	letterDate: {
		type: Date,
	},
	markedTo: {
		//ID OF DA
		type: mongoose.Schema.Types.ObjectId,
	},
	fileNo: {
		type: String,
	},
	dispatchNo: {
		type: Number,
	},
	dispatchDate: {
		type: Date,
	},
	status: {
		type: String,
		default: "Pending",
	},
	isDone: {
		type: Boolean,
		default: false,
	},
	doneDate: {
		type: Date,
	},
});

module.exports = mongoose.model("Diary", DiarySchema);
