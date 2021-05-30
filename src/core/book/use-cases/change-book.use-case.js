const LibrarianUseCase = require("../../auth/use-cases/abstract/librarian.use-case");
const UseCaseError = require("../../error/use-case.error");
const BookService = require("../book.service");

class ChangeBookError extends UseCaseError { }

class ChangeBookUseCase extends LibrarianUseCase {
	_bookService = BookService;

	async _executeAuthorized() {
		const { bookId } = this._request;
		const book = await this._bookService.findById(bookId);

		if (!book) throw new ChangeBookError("Cannot change a book that doesnt exist.");

		this._applyChanges(book, this._request);

		await this._bookService.save(book);
	}

	_applyChanges(book, { title, author, publisher, releaseYear }) {
		if (title !== undefined)
			book.title = title;
		if (author !== undefined)
			book.author = author;
		if (publisher !== undefined)
			book.publisher = publisher;
		if (releaseYear !== undefined)
			book.releaseYear = releaseYear;
	}
}

module.exports = ChangeBookUseCase;