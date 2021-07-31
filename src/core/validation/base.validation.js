<<<<<<< HEAD:src/core/validation/base.validation.js
const NotOverridenError = require("../error/not-overriden.error");
const ValidationError = require("./validation.error");
=======
const { NotOverridenError } = require("../error/not-overriden.error");
const { ValidationError } = require("../error/validation.error");
>>>>>>> develop:src/core/base/base.validation.js

class BaseValidation {
	_DEFAULT_ATTRIBUTE_NAME = "Value";
	_value;
	_options;

	constructor (value, options) {
		this._value = value;
		this._options = options;

		this._options.attributeName = this._options.attributeName || this._DEFAULT_ATTRIBUTE_NAME;
		this._options.required = this._options.required === true;

		this.validate();
	}

	_type() {
		throw new NotOverridenError();
	}

	validate() {
		this._validateExistence();

		if (!this._valueExists())
			return;

		this._validateType();

		if (this._options.requiredValue !== undefined) {
			this._validateRequiredValue();
			return;
		}

		if (Array.isArray(this._options.allowedValues)) {
			this._validateAllowedValues();
			return;
		}

		this._validate();
	}

	_validateExistence() {
		if (this._options.required) {
			if (!this._valueExists())
				throw new ValidationError(`${this._options.attributeName} does not exist but is required.`);
		}
	}

	_valueExists() {
		return this._value !== null && this._value !== undefined;
	}

	_validateType() {
		if (typeof this._value !== this._type())
			throw new ValidationError(`${this._options.attributeName} is not of type ${this._type()}.`);
	}

	_validateRequiredValue() {
		if (this._value !== this._options.requiredValue)
			throw new ValidationError(`${this._options.attributeName} does not equal the required value ${this._options.requiredValue}.`)
	}

	_validateAllowedValues() {
		if (!this._options.allowedValues.includes(this._value))
			throw new ValidationError(`${this._options.attributeName} is not one of the allowed values.`);
	}

	_validate() {
		throw new NotOverridenError();
	}
}

module.exports = { BaseValidation };