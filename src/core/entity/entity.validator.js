const NotOverridenError = require("../error/not-overriden.error");

class EntityValidator {
	validate(entity) {
		throw new NotOverridenError();
	}
}

module.exports = EntityValidator;