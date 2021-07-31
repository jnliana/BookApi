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

			const books = await Interactor.interactAsync(Book.ViewAll, params)
			return res.deliverPayload(200, { books });
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

			const bookId = await Interactor.interactAsync(Book.Add, params);
			return res.deliverPayload(200, { createdBook: bookId });
		}
	);

	router.get(
		"/:bookId",
		async (req, res) => {
			const params = {
				bookId: req.params.bookId
			};

			const book = await Interactor.interactAsync(Book.ViewSpecific, params);
			if (!book)
				throw new NotFoundError("Failed to find book with the id " + params.bookId + ".");
			else
				return res.deliverPayload(200, { book });
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

			await Interactor.interactAsync(Book.Delete, params);
			return res.deliverMessage(200, `Book ${bookId} was <succesfully deleted.`);
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

			await Interactor.interactAsync(Book.Change, params);
			return res.deliverMessage(200, `Book ${bookId} was succesfully changed.`);
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

			await Interactor.interactAsync(Book.Change, params);
			return res.deliverMessage(200, `Book ${bookId} was succesfully changed.`);
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

			await Interactor.interactAsync(Book.Borrow, params);
			return res.deliverMessage(200, `Book ${bookId} was succesfully borrowed.`);
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

			await Interactor.interactAsync(Book.Return, params);
			return res.deliverMessage(200, `Book ${bookId} was succesfully returned.`);
		}
	);

	return router;
}

module.exports = { makeBookRouter };