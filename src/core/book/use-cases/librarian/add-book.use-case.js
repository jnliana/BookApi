<<<<<<< HEAD:src/core/book/use-cases/librarian/add-book.use-case.js
const LibrarianUseCase = require("../../../use-case/librarian.use-case");
const BookService = require("../../book.service");
=======
const { LibrarianUseCase } = require("../../auth/use-cases/abstract/librarian.use-case");
const { BookService } = require("../book.service");
>>>>>>> develop:src/core/book/use-cases/add-book.use-case.js

class AddBookUseCase extends LibrarianUseCase {
	_bookService = BookService;

	async _executeAuthorized() {
		const bookId = await this._bookService.create(this._request);
		return bookId;
	}
}

module.exports = { AddBookUseCase };