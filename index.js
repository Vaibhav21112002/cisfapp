const db = require("./db/index");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const DDORouter = require("./routes/DDO-routers");
const DARouter = require("./routes/DA-router");
const DiaryRouter = require("./routes/diary-router");

db();
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
	res.send("Status Ok!");
});

app.use("/api/ddo", DDORouter);
app.use("/api/da", DARouter);
app.use("/api/diary", DiaryRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

// module.exports = { instance };
