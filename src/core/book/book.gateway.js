<<<<<<< HEAD
const EntityGateway = require('../entity/entity.gateway');
const Config = require('../config');
const Book = require('./book.entity');
=======
const { Config } = require('../config');
const { BaseGateway } = require('../base/base.gateway');
const { Book } = require('./book.entity');
>>>>>>> develop

class BookGateway extends EntityGateway {
	_mapToEntity(gatewayRepresentation) {
		const book = new Book();

		book.id = gatewayRepresentation.id;
		book.createdAt = gatewayRepresentation.createdAt;
		book.modifiedAt = gatewayRepresentation.modifiedAt;

		book.title = gatewayRepresentation.title;
		book.publisher = gatewayRepresentation.publisher;
		book.author = gatewayRepresentation.author;
		book.releaseYear = gatewayRepresentation.releaseYear;
		book.borrowed = gatewayRepresentation.borrowed;

		return book;
	}
}

module.exports = { 
	BookGateway: Object.freeze(new BookGateway(Config.bookDataJsonFile)) 
};