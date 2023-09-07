/**
 * Custom class for handling validation errors
 * statusCode 400 for bad request
 * @class
 * @extends Error
 * @param {string} message error message for exception
 */
export class ValidationError extends Error {
	constructor(message) {
		super(message); //uses the constructor of Error class for messages
		this.statusCode = 400;
		this.name = "ValidationError";
	}
}