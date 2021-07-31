const { BaseValidation } = require("../base/base.validation");
const { ValidationError } = require("../error/validation.error");

class StringValidation extends BaseValidation {
	_EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	_type = "string";

	_validate() {
		if (this._options.maxLength) this._validateMaxLength();
		if (this._options.minLength) this._validateMinLength();

		if (this._options.email === true)
			this._options.pattern = this._EMAIL_PATTERN;

		if (this._options.pattern) this._validatePattern();
	}

	_validateMaxLength() {
		if (this._value.length > this._options.maxLength)
			throw new ValidationError(`${this._options.attributeName} exceeds the maximum length of ${this._options.maxLength}.`);
	}

	_validateMinLength() {
		if (this._value.length < this._options.minLength)
			throw new ValidationError(`${this._options.attributeName} is shorter than the minimum length of ${this._options.minLength}.`);
	}

	_validatePattern() {
		if (!new RegExp(this._options.pattern).test(this._value))
			throw new ValidationError(`${this._options.attributeName} does not fit the required pattern.`);
	}
}

module.exports = { StringValidation };