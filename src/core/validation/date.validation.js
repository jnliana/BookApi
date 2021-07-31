const { BaseValidation } = require("../base/base.validation");
const { ValidationError } = require("../error/validation.error");

class DateValidation extends BaseValidation {
	_type = "date";

	_validate() {
		if (this._options.notEarlier)
			this._validateNotEarlier();

		if (this._options.notLater)
			this._validateNotEarlier();
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