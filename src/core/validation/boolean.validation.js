const Types = require("../utility/types");
const BaseValidation = require("./base.validation");

class BooleanValidation extends BaseValidation {
	_type() {
		return Types.BOOLEAN;
	} 

	_validate() { }
}

module.exports = BooleanValidation;