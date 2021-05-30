const LibrarianUseCase = require("../../auth/use-cases/abstract/librarian.use-case");
const UseCaseError = require("../../error/use-case.error");
const BookService = require("../book.service");

class RemoveBookError extends UseCaseError { }

class RemoveBookUseCase extends LibrarianUseCase {
	_bookService = BookService;

	async _executeAuthorized() {
		const { bookId } = this._request;
		const book = await this._bookService.findById(bookId);
		
		if (!book) throw new RemoveBookError("Cannot remove a book that doesnt exist.");
		if (book.borrowed) throw new RemoveBookError("Cannot remove a book that is still borrowed.");

		await this._bookService.removeById(book.id);
	}
}

module.exports = RemoveBookUseCase;