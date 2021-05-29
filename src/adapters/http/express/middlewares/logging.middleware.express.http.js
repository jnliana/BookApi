module.exports = async (req, res, next) => {
	console.log(`[${new Date().toISOString()}] HTTP ${req.method} ${req.url}`);
	next();
}