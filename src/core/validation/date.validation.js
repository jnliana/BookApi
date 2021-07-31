<<<<<<< HEAD
const Types = require("../utility/types");
const BaseValidation = require("./base.validation");
const ValidationError = require("./validation.error");
=======
const { BaseValidation } = require("../base/base.validation");
const { ValidationError } = require("../error/validation.error");
>>>>>>> develop

class DateValidation extends BaseValidation {
	_type() {
		return Types.OBJECT;
	}
 
	_validate() {
		this._validateInstance();

		if (this._options.notEarlier)
			this._validateNotEarlier();

		if (this._options.notLater)
			this._validateNotEarlier();
	}

	_validateInstance() {
		if ((this._value instanceof Date) === false)
			throw new ValidationError(`${this._options.attributeName} is not an instance of Date.`);
	}

	_validateNotEarlier() {
		if (this._value < this._options.notEarlier)
			throw new ValidationError(`${this._options.attributeName} is earlier the minimum date of ${this._options.notEarlier}.`);
	}

	_validateNotLater() {
		if (this._value > this._options.notLater)
			throw new ValidationError(`${this._options.attributeName} is later the maximum date of ${this._options.notLater}.`);
	}
}

module.exports = { DateValidation }