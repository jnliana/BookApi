const BaseValidator = require("../base/base.validator");
const StringValidation = require("../validation/string.validation");

class BookValidator extends BaseValidator {
	validate(book) {
		this._validateTitle(book.title);
		this._validateAuthor(book.author);
		this._validatePublisher(book.publisher);
		this._validateReleaseYear(book.releaseYear);
		this._validateBorrowed(book.borrowed);
	}

	_validateTitle(title) {
		new StringValidation(title, { attributeName: "Title", required: true, maxLength: 255, minLength: 1 });
	}

	_validatePublisher(publisher) {

	}

	_validateAuthor(author) {

	}

	_validateReleaseYear(releaseYear) {

	}

	_validateBorrowed(borrowed) {

	}
}

module.exports = Object.freeze(new BookValidator());