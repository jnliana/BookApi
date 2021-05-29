const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");
const UseCaseError = require("../../error/use-case.error");
const UserService = require("../../user/user.service");
const BookService = require("../book.service");

class BorrowBookError extends UseCaseError { }

class BorrowBookUseCase extends ActivatedUseCase {
	_MAX_BORROWED_BOOKS = 3;
	_bookService = BookService;
	_userService = UserService;

	async _executeActivated() {
		const { bookId } = this._request;
		const user = this._issuer;

		const book = await this._getBook(bookId);

		await this._checkUserCanBorrowAnotherBook(user);

		await this._setBookToBorrowed(book, bookId);
		await this._addBookToUsersBorrowedBooks(user, bookId);
	}

	async _getBook(bookId) {
		const book = await this._bookService.findById(bookId);
		await this._validateBook(book);
		return book;
	}

	async _validateBook(book) {
		if (!book)
			throw new BorrowBookError("Cannot borrow a book that doesnt exist.");
		if (book.borrowed)
			throw new BorrowBookError("Book is already borrowed.");
	}

	async _checkUserCanBorrowAnotherBook(user) {
		if (user.borrowedBooks.length >= this._MAX_BORROWED_BOOKS)
			throw new BorrowBookError("User cannot borrow any more books.");
	}

	async _setBookToBorrowed(book, bookId) {
		book.borrowed = true;
		await this._bookService.updateById(bookId, book);
	}

	async _addBookToUsersBorrowedBooks(user, bookId) {
		user.borrowedBooks.push(bookId);
		await this._userService.updateById(user.Id, user);
	}
}

module.exports = BorrowBookUseCase;