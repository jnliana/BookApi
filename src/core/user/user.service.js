const BaseService = require("../base/base.service");
const UserValidator = require("./user.validator");
const UserGateway = require("./user.gateway");
const User = require("./user.entity");
const MailService = require("../mail/mail.service");
const Config = require("../config");
const ServiceError = require("../error/service.error");

class UserServiceError extends ServiceError { }


class UserService extends BaseService {
	_MIN_PASSWORD_LENGTH = 7;
	_mailService = MailService;

	async validatePassword(password) {
		if (typeof password !== "string")
			throw new UserServiceError("Password is not a string.");
		if (!Config.PRODUCTION) return;

		if (password.length < this._MIN_PASSWORD_LENGTH)
			throw new UserServiceError("Password is too short.");
	}

	async findByEmail(email) {
		return await this._gateway.findByEmail(email);
	}

	async findByActivationToken(activationToken) {
		return await this._gateway.findByActivationToken(activationToken);
	}

	async issueActivation(user) {
		user.issueActivation();
		await this._gateway.save(user);
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
		await this._gateway.insert(user);
		return user.id;
	}
}

module.exports = Object.freeze(new UserService(UserGateway, UserValidator));