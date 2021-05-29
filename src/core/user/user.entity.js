const Entity = require("../base/base.entity");
const { hash, compareHash } = require("../utility/hash");
const token = require("../utility/token");

class User extends Entity {
	firstName;
	lastName;
	email;
	passwordHash;
	role;
	activation;
	borrowedBooks;

	constructor (firstName, lastName, email, password = "", role) {
		super();

		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.passwordHash = hash(password);
		this.role = role;
		this.activation = {
			issuedAt: null,
			completedAt: null,
			token: null,
			completed: false
		};
		this.borrowedBooks = [];
	}

	isActivated() {
		return this.activation.completed === true;
	}

	checkPassword(plain) {
		return compareHash(plain, this.passwordHash);
	}

	setPassword(password) {
		this.passwordHash = hash(password);
	}

	completeActivation() {
		this.activation.completed = true;
		this.activation.completedAt = new Date();
	}

	issueActivation() {
		this.activation.token = token();
		this.activation.issuedAt = new Date();
		this.activation.completed = false;
		this.activation.completedAt = null;
	}

	borrowBook(bookId) {
		this.borrowedBooks.push(bookId);
	}

	returnBook(bookId) {
		const index = this.borrowedBooks.indexOf(bookId);
		if (index >= 0) this.borrowedBooks.splice(index, 1);
	}
}

module.exports = User;