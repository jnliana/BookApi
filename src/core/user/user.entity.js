const Entity = require("../base/base.entity");
const { hash, compareHash } = require("../utility/hash");

class User extends Entity {
	firstName;
	lastName;
	email;
	passwordHash;
	role;
	activation;
	borrowedBooks;

	constructor (firstName, lastName, email, password, role) {
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
}

module.exports = User;