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

		await this._checkBookIsNotBorrowed(book);
		await this._checkUserCanBorrowAnotherBook(user);
		
		await this._borrowBook(book, bookId, user);
	}

	async _getBook(bookId) {
		const book = await this._bookService.findById(bookId);
		if (!book)
			throw new BorrowBookError("Cannot borrow a book that doesnt exist.");
		return book;
	}

	async _checkBookIsNotBorrowed(book) {
		if (book.borrowed)
			throw new BorrowBookError("Book is already borrowed.");
	}

	async _checkUserCanBorrowAnotherBook(user) {
		if (user.borrowedBooks.length >= this._MAX_BORROWED_BOOKS)
			throw new BorrowBookError("User cannot borrow any more books.");
	}

	async _borrowBook(book, bookId, user) {
		await this._markBookAsBorrowed(book);
		await this._addBookToUsersBorrowedBooks(user, bookId);
	}

	async _markBookAsBorrowed(book) {
		book.borrow();
		await this._bookService.save(book);
	}

	async _addBookToUsersBorrowedBooks(user, bookId) {
		user.borrowBook(bookId);
		await this._userService.save(user);
	}
}

module.exports = BorrowBookUseCase;