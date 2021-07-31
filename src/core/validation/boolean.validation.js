<<<<<<< HEAD
const Types = require("../utility/types");
const BaseValidation = require("./base.validation");
=======
const { BaseValidation } = require("../base/base.validation");
>>>>>>> develop

class BooleanValidation extends BaseValidation {
	_type() {
		return Types.BOOLEAN;
	} 

	_validate() { }
}

module.exports = { BooleanValidation };