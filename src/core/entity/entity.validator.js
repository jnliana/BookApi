const { NotOverridenError } = require("../error/not-overriden.error");

class EntityValidator {
	validate(entity) {
		throw new NotOverridenError();
	}
}

<<<<<<< HEAD:src/core/entity/entity.validator.js
module.exports = EntityValidator;
=======
module.exports = { BaseValidator };
>>>>>>> develop:src/core/base/base.validator.js
