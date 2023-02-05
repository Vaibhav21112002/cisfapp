const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.DAlogin = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status(401).json({ message: "Access Denied" });
	try {
		const verified = jwt.verify(token, JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(200).json({ success: false, message: err.message });
	}
};

exports.adminLogin = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status(401).json({ message: "Access Denied" });
	try {
		const verified = jwt.verify(token, JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(200).json({ succes: "TI", message: err.message });
	}
};
