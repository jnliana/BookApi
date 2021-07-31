const { Router } = require("express");

const { makeAuthGuardMiddleware } = require("../../middleware/auth-guard.middleware");

const { Interactor } = require("../../../core/interactor/interactor");
const { Book } = require("../../../core/interactions").Interactions;

const { BorrowBookUseCase } = require("../../../core/book/use-cases/borrow-book.use-case");
const { ReturnBookUseCase } = require("../../../core/book/use-cases/return-book.use-case");
const { AddBookUseCase } = require("../../../core/book/use-cases/add-book.use-case");
const { RemoveBookUseCase } = require("../../../core/book/use-cases/remove-book.use-case");
const { ChangeBookUseCase } = require("../../../core/book/use-cases/change-book.use-case");
const { ViewAllBooksUseCase } = require("../../../core/book/use-cases/view-all-books.use-case");
const { ViewSpecificBookUseCase } = require("../../../core/book/use-cases/view-specific-book.use-case");

function makeBookRouter() {
	const router = Router();

	router.get(
		"/",
		async (req, res) => {
			const useCase = new ViewAllBooksUseCase();
			const books = await useCase.execute();

			return res.status(200).json(books);
		}
	);

	router.post(
		"/",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const authToken = this._getAuthTokenFromRequest(req);

			Interactor.interact(Book.Add, { ...req.body, authToken }, bookId => {
				return res.status(201).json(bookId);
			});
		}
	);

	router.get(
		"/:bookId",
		async (req, res) => {
			const { bookId } = req.params;
			const useCase = new ViewSpecificBookUseCase({ bookId });
			const book = await useCase.execute();

			if (!book) return res.status(404).json("No book with that id");
			else return res.status(200).json(book);
		}
	);

	router.delete(
		"/:bookId",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const { bookId } = req.params;
			const authToken = this._getAuthTokenFromRequest(req);

			const useCase = new RemoveBookUseCase({ bookId }, authToken);
			await useCase.execute();

			return res.status(200).json(`Book ${bookId} was succesfully deleted.`);
		}
	)

	router.put(
		"/:bookId",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const { bookId } = req.params;
			const authToken = this._getAuthTokenFromRequest(req);

			const useCase = new ChangeBookUseCase({ ...req.body, bookId }, authToken);
			await useCase.execute();

			return res.status(200).json(`Book ${bookId} was succesfully changed.`);
		}
	);

	router.patch(
		"/:bookId",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const { bookId } = req.params;
			const authToken = this._getAuthTokenFromRequest(req);

			const useCase = new ChangeBookUseCase({ ...req.body, bookId }, authToken);
			await useCase.execute();

			return res.status(200).json(`Book ${bookId} was succesfully changed.`);

		}
	);

	router.patch(
		"/:bookId/borrow",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const { bookId } = req.params;
			const authToken = this._getAuthTokenFromRequest(req);

			const useCase = new BorrowBookUseCase({ bookId }, authToken);
			await useCase.execute();

			return res.status(200).json(`Book ${bookId} was succesfully borrowed.`);
		}
	);

	router.patch(
		"/:bookId/return",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const { bookId } = req.params;
			const authToken = this._getAuthTokenFromRequest(req);

			const useCase = new ReturnBookUseCase({ bookId }, authToken);
			await useCase.execute();

			return res.status(200).json(`Book ${bookId} was succesfully returned.`);
		}
	);

	return router;
}

module.exports = { makeBookRouter };