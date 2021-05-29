const BaseUseCase = require("../../base/base.use-case");
const BookService = require("../book.service");

class ViewAllBooksUseCase extends BaseUseCase {
	_bookService = BookService;
	
	async execute() {
		return await this._bookService.findAll();
	}
}

module.exports = ViewAllBooksUseCase;