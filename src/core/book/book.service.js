<<<<<<< HEAD
const EntityService = require('../entity/entity.service');
const BookGateway = require("./book.gateway");
const Book = require('./book.entity');
const BookValidator = require("./book.validator");
=======
const { BaseService } = require('../base/base.service');
const { BookGateway } = require("./book.gateway");
const { Book } = require('./book.entity');
const { BookValidator } = require("./book.validator");
>>>>>>> develop

class BookService extends EntityService {
	async create({ title, publisher, author, releaseYear }) {
		const book = new Book(title, publisher, author, releaseYear);
		this._validator.validate(book);
		await this._gateway.insert(book);
		return book.id;
	}
}

module.exports = { BookService: Object.freeze(new BookService(BookGateway, BookValidator)) };