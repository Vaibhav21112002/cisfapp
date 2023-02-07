const express = require("express");
const router = express.Router();

const {
	getDA,
	createDA,
	loginDA,
	getDAIdByToken,
	getDAByToken,
	removeDA,
} = require("../controllers/DA-ctrl");

router.get("/", getDA);
router.post("/", createDA);
router.post("/login", loginDA);
router.post("/token/id", getDAIdByToken);
router.post("/token/name", getDAByToken);
router.delete("/:id", removeDA);

module.exports = router;
