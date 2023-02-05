const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGO_URI;

const connnect = (async) => {
	mongoose
		.connect(URI)
		.then(() => {
			console.log("Database is Connected");
		})
		.catch((err) => {
			console.log(err.message);
		});
};

module.exports = connnect;
