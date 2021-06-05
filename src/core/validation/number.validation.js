const BaseValidation = require("./base.validation");
const ValidationError = require("./validation.error");
const Types = require("../utility/types");

class NumberValidation extends BaseValidation {
	_type() {
		return Types.NUMBER;
	}

	_validate() {
		if (this._options.minimum !== undefined)
			this._validateMinimum();

		if (this._options.maximum !== undefined)
			this._validateMaximum();

		if (this._options.integer === true)
			this._validateInteger();

		if (this._options.notInfinity !== false)
			this._validateNotInfinity();

		if (this._options.notNaN !== false)
			this._validateNotNaN();
	}

	_validateMinimum() {
		if (this._value < this._options.minimum)
			throw new ValidationError(`${this._options.attributeName} is smaller than the allowed minimum of ${this._options.minimum}.`);
	}

	_validateMaximum() {
		if (this._value > this._options.maximum)
			throw new ValidationError(`${this._options.attributeName} is bigger than the allowed maximum of ${this._options.maximum}.`);
	}

	_validateInteger() {
		if (Math.floor(this._value) !== this._value)
			throw new ValidationError(`${this._options.attributeName} is not an integer.`);
	}

	_validateNotInfinity() {
		if(!isFinite(this._value))
			throw new ValidationError(`${this._options.attributeName} is infinity.`)
	}

	_validateNotNaN() {
		if(isNaN(this._value))
			throw new ValidationError(`${this._options.attributeName} is NaN.`)
	}
}

module.exports = NumberValidation;