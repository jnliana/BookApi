const BaseUseCase = require("../../base/base.use-case");
const BookService = require("../book.service");

class GetSpecificBookUseCase extends BaseUseCase {
	_bookService = BookService;
	
	async execute() {
		return await this._bookService.findById(this._request.id);
	}
}

module.exports = GetSpecificBookUseCase;