const LibrarianUseCase = require("../../auth/use-cases/abstract/librarian.use-case");
const UseCaseError = require("../../error/use-case.error");
const BookService = require("../book.service");

class RemoveBookError extends UseCaseError { }

class RemoveBookUseCase extends LibrarianUseCase {
	_bookService = BookService;

	async _executeAuthorized() {
		const { bookId } = this._request;
		
		const book = await this._getBook(bookId);
		await this._checkBookIsNotBorrowed(book);
		await this._bookService.removeById(book.id);
	}

	async _getBook(bookId) {
		const book = await this._bookService.findById(bookId);
		if (!book)
			throw new RemoveBookError("Cannot remove a book that doesnt exist.");

		return book;
	}

	async _checkBookIsNotBorrowed(book) {
		if (book.borrowed)
			throw new RemoveBookError("Cannot remove a book that is still borrowed.");
	}
}

module.exports = RemoveBookUseCase;