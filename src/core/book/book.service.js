const BaseService = require('../base/base.service');
const BookDbal = require("./book.dbal");
const Book = require('./book.entity');
const BookValidator = require("./book.validator");

class BookService extends BaseService {
	async create({ title, publisher, author, releaseYear }) {
		const book = new Book(title, publisher, author, releaseYear);
		this._validator.validate(book);
		await this._dbal.add(book);
		return book.id;
	}

	async updateById(id, { title, publisher, author, releaseYear }) {
		const book = await this._dbal.findById(id);
		if (!book) return null;

		book.title = title;
		book.publisher = publisher;
		book.author = author;
		book.releaseYear = releaseYear;
		book.modifiedAt = new Date();

		this._validator.validate(book);
		await this._dbal.save(book);
	}

	async patchById(id, { title, publisher, author, releaseYear }) {
		const book = await this._dbal.findById(id);
		if (!book) return null;

		if (title !== undefined) book.title = title;
		if (publisher !== undefined) book.publisher = publisher;
		if (author !== undefined) book.author = author;
		if (releaseYear !== undefined) book.releaseYear = releaseYear;
		book.modifiedAt = new Date();

		this._validator.validate(book);
		await this._dbal.save(book);
	}
}

module.exports = Object.freeze(new BookService(BookDbal, BookValidator));