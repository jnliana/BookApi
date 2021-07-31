const useCases = Object.freeze([
	require("./add-book.use-case").AddBookUseCase,
	require("./borrow-book.use-case").BorrowBookUseCase,
	require("./change-book.use-case").ChangeBookUseCase,
	require("./remove-book.use-case").RemoveBookUseCase,
	require("./return-book.use-case").ReturnBookUseCase,
	require("./view-all-books.use-case").ViewAllBooksUseCase,
	require("./view-specific-book.use-case").ViewSpecificBookUseCase
]);


module.exports = { UseCases: useCases };