const BaseValidation = require("../base/base.validation");
const ValidationError = require("../error/validation.error");

class StringValidation extends BaseValidation {
	validate() {
		this._validateExistence();
		if (!this._valueExists()) return;

		this._validateType();
		this._validateMaxLength();
		this._validateMinLength();
	}

	_validateType() {
		if (typeof this._value !== "string")
			throw new ValidationError(`${this._options.attributeName} is not of type string.`);
	}

	_validateMaxLength() {
		if (this._options.maxLength) {
			if (this._value.length > this._options.maxLength)
				throw new ValidationError(`${this._options.attributeName} exceeds the maximum length of ${this._options.maxLength}.`);
		}
	}

	_validateMinLength() {
		if (this._options.minLength) {
			if (this._value.length < this._options.minLength)
				throw new ValidationError(`${this._options.attributeName} is shorter than the minimum length of ${this._options.minLength}.`);
		}
	}
}

module.exports = StringValidation;