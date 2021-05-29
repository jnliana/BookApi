const NotOverridenError = require("../../../../core/error/not-overriden.error");

class BaseExpressRouter {
	makeExpressRouter() {
		throw new NotOverridenError();
	}

	async hasAuthTokenGuard(req, res, next) {
		const authToken = this._getAuthTokenFromRequest(req);
		if (!authToken) return res.status(401).json("No auth token found in the Authorization header.");
		else next();
	}

	_getAuthTokenFromRequest(req) {
		const authHeader = req.get("Authorization");
		if (!authHeader) return null;

		const token = authHeader.split(" ")[1] || null;
		return token;
	}
}

module.exports = BaseExpressRouter;