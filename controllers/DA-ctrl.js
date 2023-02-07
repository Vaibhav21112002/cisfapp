const DA = require("../models/DA");
const Diary = require("../models/Diary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.getDA = async (req, res) => {
	try {
		const da = await DA.find();
		const daWithOutPassword = [];
		for (let i = 0; i < da.length; i++) {
			daWithOutPassword.push({
				cisfNo: da[i].cisfNo,
				name: da[i].name,
				email: da[i].email,
				username: da[i].username,
				type: da[i].type,
				_id: da[i]._id,
			});
		}
		res.status(200).json(daWithOutPassword);
	} catch (err) {
		res.status(200).json({ message: err.message });
	}
};

exports.createDA = async (req, res) => {
	try {
		const { cisfNo, name, email, password, type } = req.body;
		const user = await DA.findOne({ email });
		if (user) {
			return res.status(200).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const da = new DA({
			cisfNo,
			name,
			email,
			password: hashedPassword,
			type,
		});

		const newDA = await da.save();
		if (newDA.success == false) {
			swal({
				title: "Error!",
				text: "Something went wrong!",
				icon: "error",
			});
			return;
		}
		res.status(201).json({
			success: true,
			message: "DA created successfully",
			da: newDA,
		});
	} catch (err) {
		res.status(200).json({ success: false, message: err.message });
	}
};

exports.loginDA = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res
				.status(200)
				.json({ succes: false, message: "Please enter all fields" });
		}

		const user = await DA.findOne({ email });
		if (!user) {
			return res
				.status(200)
				.json({ success: false, essage: "User does not exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(200)
				.json({ success: false, message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user._id, type: user.type }, JWT_SECRET, {
			expiresIn: 3600,
		});
		if (!token) {
			return res
				.status(200)
				.json({ success: false, message: "Could not sign the token" });
		}

		res.status(200).json({
			success: true,
			token,
			user,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.getDAIdByToken = async (req, res) => {
	try {
		const token = req.body.token;
		if (!token) {
			return res
				.status(200)
				.json({ message: "No token, authorization denied" });
		}

		const decoded = jwt.verify(token, JWT_SECRET);
		if (!decoded) {
			return res.status(200).json({ message: "Invalid token" });
		}

		const da = await DA.findById(decoded.id);
		if (!da) {
			return res.status(200).json({ message: "User does not exist" });
		}

		res.status(200).json({ daId: da._id });
	} catch (err) {
		res.status(200).json({ message: err.message });
	}
};

exports.getDAByToken = async (req, res) => {
	try {
		const token = req.body.token;
		if (!token) {
			return res
				.status(200)
				.json({ message: "No token, authorization denied" });
		}

		const decoded = jwt.verify(token, JWT_SECRET);
		if (!decoded) {
			return res.status(200).json({ message: "Invalid token" });
		}

		const da = await DA.findById(decoded.id);
		if (!da) {
			return res.status(200).json({ message: "User does not exist" });
		}

		let name = da.name + " (" + da.type.toUpperCase() + ")";
		res.status(200).json({ da: name });
	} catch (err) {
		res.status(200).json({ message: err.message });
	}
};

exports.removeDA = async (req, res) => {
	const id = req.params.id;
	try {
		const da = await DA.findById(id);
		if (!da) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		}

		const diary = await Diary.find({ markedTo: id });
		for (let i = 0; i < diary.length; i++) {
			await Diary.findByIdAndDelete(diary[i]._id);
		}

		await DA.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "User removed successfully",
		});
	} catch (err) {
		res.status(200).json({ success: false, message: err.message });
	}
};
