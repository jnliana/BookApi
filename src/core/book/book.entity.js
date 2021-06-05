const Entity = require("../entity/base.entity");

class Book extends Entity {
	title;
	publisher;
	author;
	releaseYear;
	borrowed;

	constructor(title, publisher, author, releaseYear) {
		super();
		
		this.title = title;
		this.publisher = publisher;
		this.author = author;
		this.releaseYear = releaseYear;
		this.borrowed = false;
	}

	borrow() {
		this.borrowed = true;
	}

	return() {
		this.borrowed = false;
	}
}

module.exports = Book;