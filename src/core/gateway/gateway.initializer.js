const NotOverridenError = require("../error/not-overriden.error");

class GatewayInitializer {
	async initialize() {
		throw new NotOverridenError();
	}
}

module.exports = GatewayInitializer;