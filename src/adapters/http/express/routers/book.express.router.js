const { Router } = require("express");

const { BaseExpressRouter } = require("./base.express.router");

const { BorrowBookUseCase } = require("../../../../core/book/use-cases/borrow-book.use-case");
const { ReturnBookUseCase } = require("../../../../core/book/use-cases/return-book.use-case");
const { AddBookUseCase } = require("../../../../core/book/use-cases/add-book.use-case");
const { RemoveBookUseCase } = require("../../../../core/book/use-cases/remove-book.use-case");
const { ChangeBookUseCase } = require("../../../../core/book/use-cases/change-book.use-case");
const { ViewAllBooksUseCase } = require("../../../../core/book/use-cases/view-all-books.use-case");
const { ViewSpecificBookUseCase } = require("../../../../core/book/use-cases/view-specific-book.use-case");

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

	async _returnBook(req, res) {
		const { bookId } = req.params;
		const authToken = this._getAuthTokenFromRequest(req);

		const useCase = new ReturnBookUseCase({ bookId }, authToken);
		await useCase.execute();

		return res.status(200).json(`Book ${bookId} was succesfully returned.`);
	}

	async _viewAll(req, res) {
		const useCase = new ViewAllBooksUseCase();
		const books = await useCase.execute();

		return res.status(200).json(books);
	}

	async _viewSpecific(req, res) {
		const { bookId } = req.params;
		const useCase = new ViewSpecificBookUseCase({ bookId });
		const book = await useCase.execute();

		if (!book) return res.status(404).json("No book with that id");
		else return res.status(200).json(book);
	}

	async _removeBook(req, res) {
		const { bookId } = req.params;
		const authToken = this._getAuthTokenFromRequest(req);

		const useCase = new RemoveBookUseCase({ bookId }, authToken);
		await useCase.execute();

		return res.status(200).json(`Book ${bookId} was succesfully deleted.`);
	}

	async _changeBook(req, res) {
		const { bookId } = req.params;
		const authToken = this._getAuthTokenFromRequest(req);

		const useCase = new ChangeBookUseCase({ ...req.body, bookId }, authToken);
		await useCase.execute();

		return res.status(200).json(`Book ${bookId} was succesfully changed.`);
	}

	makeExpressRouter() {
		const router = Router();

		router.get(
			"/",
			async (req, res) => await this._viewAll(req, res)
		);

		router.post(
			"/",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._addBook(req, res)
		);

		router.get(
			"/:bookId",
			async (req, res) => await this._viewSpecific(req, res)
		);

		router.delete(
			"/:bookId",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._removeBook(req, res)
		)

		router.put(
			"/:bookId",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._changeBook(req, res)
		);

		router.patch(
			"/:bookId",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._changeBook(req, res)
		);

		router.patch(
			"/:bookId/borrow",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._borrowBook(req, res)
		);

		router.patch(
			"/:bookId/return",
			async (req, res, next) => await this._hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._returnBook(req, res)
		);

		return router;
	}
}

module.exports = { BookExpressRouter: Object.freeze(new BookExpressRouter()) };