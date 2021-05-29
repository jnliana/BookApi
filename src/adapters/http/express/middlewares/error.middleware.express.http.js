module.exports = async (error, req, res, next) => {
	console.error(error);
	return res.status(400).json({ type: error.constructor.name, message: error.message });
}