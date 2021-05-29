const LibrarianUseCase = require("../../auth/use-cases/abstract/librarian.use-case");
const BookService = require("../book.service");

class AddBookUseCase extends LibrarianUseCase {
	_bookService = BookService;
	
	async _executeAuthorized() {
		const bookId = await this._bookService.create(this._request);
		return bookId;
	}
}

module.exports = AddBookUseCase;