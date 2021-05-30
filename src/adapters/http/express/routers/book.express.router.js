const { Router } = require("express");
const BaseExpressRouter = require("./base.express.router");

const BorrowBookUseCase = require("../../../../core/book/use-cases/borrow-book.use-case");
const AddBookUseCase = require("../../../../core/book/use-cases/add-book.use-case");
const ViewAllBooksUseCase = require("../../../../core/book/use-cases/view-all-books.use-case");
const ViewSpecificBookUseCase = require("../../../../core/book/use-cases/view-specific-book.use-case");

class BookExpressRouter extends BaseExpressRouter {
	async _addBook(req, res) {
		const authToken = this._getAuthTokenFromRequest(req);

		const useCase = new AddBookUseCase(req.body, authToken);
		const bookId = await useCase.execute();

		return res.status(201).json(bookId);
	}

	async _borrowBook(req, res) {
		const { bookId } = req.params;
		const authToken = this._getAuthTokenFromRequest(req);

		const useCase = new BorrowBookUseCase({ bookId }, authToken);
		await useCase.execute();

		return res.status(200).json(`Book ${bookId} was succesfully borrowed.`);
	}

	async _viewAll(req, res) {
		const useCase = new ViewAllBooksUseCase();
		const books = await useCase.execute();

		return res.status(200).json(books);
	}

	async _viewSpecific(req, res) {
		const { bookId } = req.params;
		const useCase = new ViewSpecificBookUseCase({ id: bookId });
		const book = await useCase.execute();

		if (!book) return res.status(404).json("No book with that id");
		else return res.status(200).json(book);
	}

	makeExpressRouter() {
		const router = Router();

		router.get(
			"/",
			async (req, res) => await this._viewAll(req, res)
		);

		router.get(
			"/:bookId",
			async (req, res) => await this._viewSpecific(req, res)
		);

		router.post(
			"/",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._addBook(req, res)
		);

		router.patch(
			"/:bookId/borrow",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._borrowBook(req, res)
		);

		return router;
	}
}

module.exports = Object.freeze(new BookExpressRouter());