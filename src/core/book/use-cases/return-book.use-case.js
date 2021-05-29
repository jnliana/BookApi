const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");
const UseCaseError = require("../../error/use-case.error");
const UserService = require("../../user/user.service");
const BookService = require("../book.service");

class ReturnBookError extends UseCaseError { }

class ReturnBookUseCase extends ActivatedUseCase {
	_bookService = BookService;
	_userService = UserService;

	async _executeActivated() {
		const { bookId } = this._request;
		const user = this._issuer;

		const book = await this._getBook(bookId, user);

		await this._setBookToBorrowed(book, bookId);
		await this._removeBookFromUsersBorrowedBooks(user, bookId);
	}

	async _getBook(bookId, user) {
		const book = await this._bookService.findById(bookId);
		await this._validateBook(book);
		await this._checkBookIsBorrowedByUser(user, bookId);
		return book;
	}

	async _validateBook(book) {
		if (!book)
			throw new ReturnBookError("Cannot return a book that doesnt exist.");
		if (!book.borrowed)
			throw new ReturnBookError("Book is not borrowed.");
	}

	async _checkBookIsBorrowedByUser(user, bookId) {
		const bookNotBorrowedByUser = user.borrowedBooks.filter(bId => bId === bookId).length < 1;
		if (bookNotBorrowedByUser)
			throw new ReturnBookError("User has not borrowed the book.");
	}

	async _setBookToBorrowed(book, bookId) {
		book.borrowed = false;
		await this._bookService.updateById(bookId, book);
	}

	async _removeBookFromUsersBorrowedBooks(user, bookId) {
		const indexOfBook = user.borrowedBooks.indexOf(bookId);
		user.borrowedBooks.splice(indexOfBook, 1);
		await this._userService.updateById(user.Id, user);
	}
}

module.exports = ReturnBookUseCase;