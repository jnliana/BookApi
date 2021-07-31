<<<<<<< HEAD:src/core/book/use-cases/librarian/change-book.use-case.js
const LibrarianUseCase = require("../../../use-case/librarian.use-case");
const UseCaseError = require("../../../use-case/use-case.error");
const BookService = require("../../book.service");
=======
const { LibrarianUseCase } = require("../../auth/use-cases/abstract/librarian.use-case");
const { UseCaseError } = require("../../error/use-case.error");
const { BookService } = require("../book.service");
>>>>>>> develop:src/core/book/use-cases/change-book.use-case.js

class ChangeBookError extends UseCaseError { }

class ChangeBookUseCase extends LibrarianUseCase {
	_bookService = BookService;

	async _executeAuthorized() {
		const { bookId } = this._request;

		const book = await this._getBook(bookId);
		await this._applyChanges(book, this._request);
		await this._bookService.save(book);
	}

	async _getBook(bookId) {
		const book = await this._bookService.findById(bookId);

		if (!book)
			throw new ChangeBookError("Cannot change a book that doesnt exist.");
		return book;
	}

	async _applyChanges(book, { title, author, publisher, releaseYear }) {
		if (title !== undefined) book.title = title;
		if (author !== undefined) book.author = author;
		if (publisher !== undefined) book.publisher = publisher;
		if (releaseYear !== undefined) book.releaseYear = releaseYear;
	}
}

module.exports = { ChangeBookUseCase };