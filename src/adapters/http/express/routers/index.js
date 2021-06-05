const BookExpressRouter = require("./book.express.router");
const UserExpressRouter = require("./user.express.router");

module.exports = app => {
	app.use("/api/books", BookExpressRouter.makeExpressRouter());
	app.use("/api/users", UserExpressRouter.makeExpressRouter());
};