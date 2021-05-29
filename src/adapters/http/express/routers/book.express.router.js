const { Router } = require("express");
const BaseExpressRouter = require("./base.express.router");

const BorrowBookUseCase = require("../../../../core/book/use-cases/borrow-book.use-case");
const AddBookUseCase = require("../../../../core/book/use-cases/add-book.use-case");

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

	makeExpressRouter() {
		const router = Router();

		router.post(
			"/",
			async (req, res, next) => await this.hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._addBook(req, res)
		);

		router.patch(
			"/:bookId/borrow",
			async (req, res, next) => await this.hasAuthTokenGuard(req, res, next),
			async (req, res) => await this._borrowBook(req, res)
		);

		return router;
	}
}

module.exports = Object.freeze(new BookExpressRouter());