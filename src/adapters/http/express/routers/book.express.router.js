const { Router } = require("express");
const BaseExpressRouter = require("./base.express.router");

const BorrowBookUseCase = require("../../../../core/book/use-cases/borrow-book.use-case");
const AddBookUseCase = require("../../../../core/book/use-cases/add-book.use-case");
const GetAllBooksUseCase = require("../../../../core/book/use-cases/get-all-books.use-case");
const GetSpecificBookUseCase = require("../../../../core/book/use-cases/get-specific-book.use-case");

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

	async _getAll(req, res) {
		const useCase = new GetAllBooksUseCase();
		const books = await useCase.execute();

		return res.status(200).json(books);
	}

	async _getSpecific(req, res) {
		const { bookId } = req.params;
		const useCase = new GetSpecificBookUseCase({ id: bookId });
		const book = await useCase.execute();

		if (!book) return res.status(404).json("No book with that id");
		else return res.status(200).json(book);
	}

	makeExpressRouter() {
		const router = Router();

		router.get("/", async (req, res) => await this._getAll(req, res));

		router.get("/:bookId", async (req, res) => await this._getSpecific(req, res));

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