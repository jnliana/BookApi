const BaseUseCase = require("../../base/base.use-case");
const BookService = require("../book.service");

class ViewSpecificBookUseCase extends BaseUseCase {
	_bookService = BookService;
	
	async execute() {
		const { bookId } = this._request
		return await this._bookService.findById(bookId);
	}
}

module.exports = ViewSpecificBookUseCase;