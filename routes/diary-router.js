const express = require("express");
const { DAlogin, adminLogin } = require("../middleware/login");
const router = express.Router();

const {
	getDiary,
	postDiary,
	getOneDiary,
	getDiaryForUser,
	changeDiaryDetails,
	deleteDiary,
	// changeDiaryStatusForUser,
	// markDiaryAsDone,
} = require("../controllers/diary-ctrl");

router.get("/", getDiary);
router.get("/user", DAlogin, getDiaryForUser);
router.get("/:diaryId", getOneDiary);
router.post("/", postDiary);
router.patch("/:id", changeDiaryDetails);
router.delete("/:id", deleteDiary);

// router.patch("/user/:diaryId", login, changeDiaryStatusForUser);
// router.patch("/user/:diaryId/done", login, markDiaryAsDone);

module.exports = router;
