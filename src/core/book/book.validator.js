<<<<<<< HEAD
const EntityValidator = require("../entity/entity.validator");
const StringValidation = require("../validation/string.validation");
=======
const { BaseValidator } = require("../base/base.validator");
const { StringValidation } = require("../validation/string.validation");
>>>>>>> develop

class BookValidator extends EntityValidator {
	validate(book) {
		this._validateTitle(book.title);
		this._validateAuthor(book.author);
		this._validatePublisher(book.publisher);
	}

	_validateTitle(title) {
		new StringValidation(title, { attributeName: "Title", required: true, maxLength: 255, minLength: 1 });
	}

	_validatePublisher(publisher) {
		new StringValidation(publisher, { attributeName: "Publisher", required: true, maxLength: 255, minLength: 1 });
	}

	_validateAuthor(author) {
		new StringValidation(author, { attributeName: "Author", required: true, maxLength: 255, minLength: 1 });
	}
}

module.exports = { BookValidator: Object.freeze(new BookValidator()) };