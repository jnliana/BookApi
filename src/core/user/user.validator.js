const EntityValidator = require("../entity/entity.validator");
const StringValidation = require("../validation/string.validation");

class UserValidator extends EntityValidator {
	validate(user) {
		this._validateEmail(user.email);
		this._validateFirstName(user.firstName);
		this._validateLastName(user.lastName);
	}

	validatePassword(password) {
		new StringValidation(password, { attributeName: "Password", required: true, minLength: 7 });
	}

	_validateEmail(email) {
		new StringValidation(email, { attributeName: "Email", required: true, email: true, maxLength: 255 });
	}

	_validateFirstName(firstName) {
		new StringValidation(firstName, { attributeName: "First name", required: false, minLength: 1, maxLength: 100 });
	}

	_validateLastName(lastName) {
		new StringValidation(lastName, { attributeName: "Last name", required: false, minLength: 1, maxLength: 100 });
	}
}

module.exports = Object.freeze(new UserValidator());