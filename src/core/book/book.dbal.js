const Config = require('../config');
const BaseDbal = require('../base/base.dbal');
const Book = require('./book.entity');

class BookDbal extends BaseDbal {
	_transfromToEntity(dbalRepresentation) {
		const book = new Book();

		book.id = dbalRepresentation.id;
		book.createdAt = dbalRepresentation.createdAt;
		book.modifiedAt = dbalRepresentation.modifiedAt;

		book.title = dbalRepresentation.title;
		book.publisher = dbalRepresentation.publisher;
		book.author = dbalRepresentation.author;
		book.releaseYear = dbalRepresentation.releaseYear;
		book.borrowed = dbalRepresentation.borrowed;

		return book;
	}
}

module.exports = Object.freeze(new BookDbal(Config.BOOK_DATA_JSON_FILE));