const ActivatedUseCase = require("../../use-case/activated.use-case");
const UseCaseError = require("../../use-case/use-case.error");
const UserService = require("../../user/user.service");
const BookService = require("../book.service");

class ReturnBookError extends UseCaseError { }

class ReturnBookUseCase extends ActivatedUseCase {
	_bookService = BookService;
	_userService = UserService;

	async _executeActivated() {
		const { bookId } = this._request;
		const user = this._issuer;

		const book = await this._getBook(bookId);
		await this._checkBookIsBorrowed(book);
		await this._checkBookIsBorrowedByUser(user, bookId);
		await this._returnBook(book, user, bookId);
	}
	
	async _getBook(bookId) {
		const book = await this._bookService.findById(bookId);
		if (!book)
			throw new ReturnBookError("Cannot return a book that doesnt exist.");

		return book;
	}

	async _checkBookIsBorrowed(book) {
		if (!book.borrowed)
			throw new ReturnBookError("Book is not borrowed.");
	}

	async _checkBookIsBorrowedByUser(user, bookId) {
		const bookNotBorrowedByUser = user.borrowedBooks.filter(bId => bId === bookId).length < 1;
		if (bookNotBorrowedByUser)
			throw new ReturnBookError("User has not borrowed the book.");
	}

	async _returnBook(book, user, bookId) {
		await this._markBookAsReturned(book);
		await this._removeBookFromUsersBorrowedBooks(user, bookId);
	}

	async _markBookAsReturned(book) {
		book.return();
		await this._bookService.save(book);
	}

	async _removeBookFromUsersBorrowedBooks(user, bookId) {
		user.returnBook(bookId);
		await this._userService.save(user);
	}
}

module.exports = ReturnBookUseCase;