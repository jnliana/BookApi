const BookExpressRouter = require("./book.express.router");
const AuthExpressRouter = require("./auth.express.router");
const UserExpressRouter = require("./user.express.router");

module.exports = app => {
	app.use("/api/books", BookExpressRouter.makeExpressRouter());
	app.use("/api/auth", AuthExpressRouter.makeExpressRouter());
	app.use("/api/users", UserExpressRouter.makeExpressRouter());
}