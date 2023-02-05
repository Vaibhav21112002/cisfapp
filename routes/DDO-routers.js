const express = require("express");
const router = express.Router();

const {
	getDDO,
	getDDOById,
	createDDO,
	createDDObulk,
	updateDDO,
	deleteDDO,
} = require("../controllers/DDO-ctrl");

router.get("/", getDDO);
router.get("/:id", getDDOById);
router.post("/", createDDO);
router.post("/bulk", createDDObulk);
router.patch("/:id", updateDDO);
router.delete("/:id", deleteDDO);

module.exports = router;
