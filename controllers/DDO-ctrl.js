const DDO = require("../models/DDO");
const Diary = require("../models/Diary");

exports.getDDO = async (req, res) => {
	try {
		const ddo = await DDO.find();
		res.status(200).json(ddo);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.getDDOById = async (req, res) => {
	try {
		const ddo = await DDO.findById(req.params.id);
		res.status(200).json(ddo);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.createDDO = async (req, res) => {
	const ddo = new DDO({
		code: req.body.code ? req.body.code : 0,
		nameEng: req.body.nameEng ? req.body.nameEng : "NA",
		nameHindi: req.body.nameHindi ? req.body.nameHindi : "NA",
		division: req.body.division ? req.body.division : "NA",
	});

	try {
		const newDDO = await ddo.save();
		res.status(201).json(newDDO);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.createDDObulk = async (req, res) => {
	const { ddos } = req.body;
	try {
		for (let i = 0; i < ddos.length; i++) {
			const ddo = new DDO({
				code: ddos[i].code ? ddos[i].code : 0,
				nameEng: ddos[i].nameEng ? ddos[i].nameEng : "NA",
				nameHindi: ddos[i].nameHindi ? ddos[i].nameHindi : "NA",
				division: ddos[i].division ? ddos[i].division : "NA",
			});
			await ddo.save();
		}
		res.status(201).json({ message: "DDOs added" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateDDO = async (req, res) => {
	try {
		const ddo = await DDO.findById(req.params.id);
		if (req.body.code != null) {
			ddo.code = req.body.code;
		}
		if (req.body.nameEng != null) {
			ddo.nameEng = req.body.nameEng;
		}
		if (req.body.nameHindi != null) {
			ddo.nameHindi = req.body.nameHindi;
		}
		if (req.body.division != null) {
			ddo.division = req.body.division;
		}
		const updatedDDO = await ddo.save();
		res.status(200).json(updatedDDO);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteDDO = async (req, res) => {
	try {
		const ddo = await DDO.findById(req.params.id);
		const diaries = await Diary.find({ from: ddo.code });
		for (let i = 0; i < diaries.length; i++) {
			await Diary.findByIdAndDelete(diaries[i]._id);
		}
		await ddo.remove();
		res.status(200).json({ message: "Deleted DDO" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};
