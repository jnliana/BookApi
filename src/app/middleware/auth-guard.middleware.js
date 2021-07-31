function makeAuthGuardMiddleware() {
	return async (req, res, next) => {
		const authToken = this._getAuthTokenFromRequest(req);
		if (!authToken) return res.status(401).json("No auth token found in the Authorization header.");
		else next();
	};
}

function getAuthTokenFromRequest(req) {
	const authHeader = req.get("Authorization");
	if (!authHeader) return null;

	const token = authHeader.split(" ")[1] || null;
	return token;
}

module.exports = { makeAuthGuardMiddleware, getAuthTokenFromRequest };