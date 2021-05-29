const BaseService = require("../base/base.service");
const UserValidator = require("./user.validator");
const UserGateway = require("./user.gateway");
const User = require("./user.entity");
const { hash } = require("../utility/hash");
const token = require("../utility/token");
const MailService = require("../mail/mail.service");

class UserService extends BaseService {
	_mailService = MailService;
	
	async findByEmail(email) {
		return await this._gateway.findByEmail(email);
	}

	async findByActivationToken(activationToken) {
		return await this._gateway.findByActivationToken(activationToken);
	}

	async issueActivation(user) {
		user.activation = {
			token: token(),
			issuedAt: new Date(),
			completedAt: null,
			completed: false
		};

		await this._sendActivationMail(user);
	}

	async _sendActivationMail(user) {
		const subject = "Activate your account";
		const htmlContent = 
		`
			<h1>Hello, ${user.firstName} ${user.lastName}</h1>
			<p>In order to use this app, you need to activate your account.</p>
			<p>You can use this code to activate your account: ${user.activation.token}{</p>
		`;
		
		await this._mailService.send(user.email, subject, htmlContent);
	}

	async create({ firstName, lastName, email, password, role }) {
		const user = new User(firstName, lastName, email, password, role);
		this._validator.validate(user);
		await this._gateway.add(user);
		return user.id;
	}

	async updateById(id, { firstName, lastName, email, password, role, activation }) {
		const user = await this._gateway.findById(id);
		if (!user) return null;

		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.passwordHash = hash(password);
		user.role = role;
		user.activation = activation;
		user.modifiedAt = new Date();

		this._validator.validate(user);
		await this._gateway.save(user);
	}

	async patchById(id, { firstName, lastName, email, password, role, activation }) {
		const user = await this._gateway.findById(id);
		if (!user) return null;

		if (firstName !== undefined) user.firstName = firstName;
		if (lastName !== undefined) user.lastName = lastName;
		if (email !== undefined) user.email = email;
		if (password !== undefined) user.passwordHash = hash(password);
		if (role !== undefined) user.role = role;
		if (activation !== undefined) user.activation = activation;
		user.modifiedAt = new Date();

		this._validator.validate(user);
		await this._gateway.save(user);
	}
}

module.exports = Object.freeze(new UserService(UserGateway, UserValidator));