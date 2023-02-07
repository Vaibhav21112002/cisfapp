const Diary = require("../models/Diary");

exports.getDiary = async (req, res) => {
	try {
		const diary = await Diary.find();
		res.status(200).json(diary);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.postDiary = async (req, res) => {
	const {
		serialNo,
		serialNoDate,
		from,
		subject,
		letterNo,
		letterDate,
		markedTo,
		fileNo,
		dispatchNo,
		dispatchDate,
	} = req.body;

	try {
		const diary = await Diary.create({
			serialNo,
			serialNoDate,
			from,
			subject,
			letterNo,
			letterDate,
			markedTo,
			fileNo,
			dispatchNo,
			dispatchDate,
		});
		res.status(201).json(diary);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getOneDiary = async (req, res) => {
	try {
		const diary = await Diary.findById(req.params.diaryId);
		res.status(200).json(diary);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getDiaryForUser = async (req, res) => {
	const id = req.user.id;
	try {
		const diary = await Diary.find();
		const diaryForUser = diary.filter((diary) => diary.markedTo == id);
		res.status(200).json(diaryForUser);
	} catch (error) {
		res.status(400).json({ succes: false, message: error.message });
	}
};

exports.changeDiaryDetails = async (req, res) => {
	const id = req.params.id;
	const { fileNo, dispatchNo, dispatchDate } = req.body;
	try {
		const diary = await Diary.findById(id);
		diary.fileNo = fileNo;
		diary.dispatchNo = dispatchNo;
		diary.dispatchDate = dispatchDate;
		diary.status = "Completed";
		diary.isDone = true;
		diary.doneDate = new Date();
		const updatedDiary = await diary.save();
		res.status(200).json({
			success: true,
			message: "Diary updated",
			diary: updatedDiary,
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// exports.changeDiaryStatusForUser = (req, res) => {
// 	const diaryId = req.params.diaryId;
// 	const status = req.body.status;
// 	try {
// 		Diary.findById(diaryId)
// 			.then((diary) => {
// 				if (!diary) {
// 					const error = new Error("Could not find diary.");
// 					error.statusCode = 404;
// 					throw error;
// 				}
// 				diary.status = status;
// 				return diary.save();
// 			})
// 			.then((result) => {
// 				res.status(200).json({
// 					message: "Diary updated!",
// 					diary: result,
// 				});
// 			})
// 			.catch((err) => {
// 				if (!err.statusCode) {
// 					err.statusCode = 500;
// 				}
// 				next(err);
// 			});
// 	} catch (err) {
// 		if (!err.statusCode) {
// 			err.statusCode = 500;
// 		}
// 		next(err);
// 	}
// };

// exports.markDiaryAsDone = (req, res) => {
// 	const diaryId = req.params.diaryId;
// 	const isDone = req.body.isDone;
// 	const doneDate = req.body.doneDate;
// 	try {
// 		Diary.findById(diaryId)
// 			.then((diary) => {
// 				if (!diary) {
// 					const error = new Error("Could not find diary.");
// 					error.statusCode = 404;
// 					throw error;
// 				}
// 				diary.isDone = isDone;
// 				diary.doneDate = doneDate;
// 				return diary.save();
// 			})
// 			.then((result) => {
// 				res.status(200).json({
// 					message: "Diary updated!",
// 					diary: result,
// 				});
// 			})
// 			.catch((err) => {
// 				if (!err.statusCode) {
// 					err.statusCode = 500;
// 				}
// 				next(err);
// 			});
// 	} catch (err) {
// 		if (!err.statusCode) {
// 			err.statusCode = 500;
// 		}
// 		next(err);
// 	}
// };

exports.deleteDiary = async (req, res) => {
	try {
		const diary = await Diary.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Diary deleted" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
