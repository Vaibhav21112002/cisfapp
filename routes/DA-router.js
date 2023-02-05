const express = require("express");
const router = express.Router();

const {
	getDA,
	createDA,
	loginDA,
	getDAIdByToken,
} = require("../controllers/DA-ctrl");

router.get("/", getDA);
router.post("/", createDA);
router.post("/login", loginDA);
router.get("/token", getDAIdByToken);

module.exports = router;
