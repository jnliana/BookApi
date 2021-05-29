const NotOverridenError = require("../error/not-overriden.error");
const ValidationError = require("../error/validation.error");

class BaseValidation {
	_DEFAULT_ATTRIBUTE_NAME = "Value"
	_value;
	_options;

	constructor (value, options) {
		this._value = value;
		this._options = options;

		this._options.attributeName = this._options.attributeName || this._DEFAULT_ATTRIBUTE_NAME;
		this._options.required = this._options.required === true;

		this.validate();
	}

	validate() {
		throw new NotOverridenError();
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
}

module.exports = BaseValidation;