const { Router } = require("express");

const { makeAuthGuardMiddleware, getAuthTokenFromRequest } = require("../../middleware/auth-guard.middleware");

const { Interactor } = require("../../../core/interactor/interactor");
const { Book } = require("../../../core/interactions").Interactions;

function makeBookRouter() {
	const router = Router();

	router.get(
		"/",
		async (req, res) => {
			const params = {};

			Interactor.interact(Book.ViewAll, params, books => {
				return res.status(200).json(books);
			});
		}
	);

	router.post(
		"/",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const params = {
				...req.body,
				authToken: getAuthTokenFromRequest(req)
			};

			Interactor.interact(Book.Add, params, bookId => {
				return res.status(201).json(bookId);
			});
		}
	);

	router.get(
		"/:bookId",
		async (req, res) => {
			const params = {
				bookId: req.params.bookId
			};

			Interactor.interact(Book.ViewSpecific, params, book => {
				if (!book) return res.status(404).json("No book with that id");
				else return res.status(200).json(book);
			});
		}
	);

	router.delete(
		"/:bookId",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const params = {
				bookId: req.params.bookId,
				authToken: getAuthTokenFromRequest(req)
			};

			Interactor.interact(Book.Delete, params, () => {
				return res.status(200).json(`Book ${bookId} was succesfully deleted.`);
			});
		}
	)

	router.put(
		"/:bookId",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const params = {
				...req.body,
				bookId: req.params.bookId,
				authToken: getAuthTokenFromRequest(req)
			};

			Interactor.interact(Book.Change, params, () => {
				return res.status(200).json(`Book ${bookId} was succesfully changed.`);
			});
		}
	);

	router.patch(
		"/:bookId",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const params = {
				...req.body,
				bookId: req.params.bookId,
				authToken: getAuthTokenFromRequest(req)
			};

			Interactor.interact(Book.Change, params, () => {
				return res.status(200).json(`Book ${bookId} was succesfully changed.`);
			});
		}
	);

	router.patch(
		"/:bookId/borrow",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const params = {
				bookId: req.params.bookId,
				authToken: getAuthTokenFromRequest(req)
			};

			Interactor.interact(Book.Borrow, params, () => {
				return res.status(200).json(`Book ${bookId} was succesfully borrowed.`);
			});
		}
	);

	router.patch(
		"/:bookId/return",
		makeAuthGuardMiddleware(),
		async (req, res) => {
			const params = {
				bookId: req.params.bookId,
				authToken: getAuthTokenFromRequest(req)
			};

			Interactor.interact(Book.Return, params, () => {
				return res.status(200).json(`Book ${bookId} was succesfully returned.`);
			});
		}
	);

	return router;
}

module.exports = { makeBookRouter };