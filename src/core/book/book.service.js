const BaseService = require('../base/base.service');
const BookGateway = require("./book.gateway");
const Book = require('./book.entity');
const BookValidator = require("./book.validator");

class BookService extends BaseService {
	async create({ title, publisher, author, releaseYear }) {
		const book = new Book(title, publisher, author, releaseYear);
		this._validator.validate(book);
		await this._gateway.add(book);
		return book.id;
	}
}

module.exports = Object.freeze(new BookService(BookGateway, BookValidator));