<<<<<<< HEAD
const BaseUseCase = require("../../use-case/base.use-case");
const BookService = require("../book.service");
=======
const { BaseUseCase } = require("../../base/base.use-case");
const { BookService } = require("../book.service");
>>>>>>> develop

class ViewAllBooksUseCase extends BaseUseCase {
	_bookService = BookService;

	async execute() {
		return await this._bookService.findAll();
	}
}

module.exports = { ViewAllBooksUseCase };