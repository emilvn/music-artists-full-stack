/**
 * ValidationError
 * Custom class for handling validation errors
 * statusCode 400 for bad request
 * @class
 * @extends Error
 * @param {String} message error message for exception
 */
export class ValidationError extends Error {
	static name = "ValidationError";
	static statusCode = 400;
	constructor(message) {
		super(message); //uses the constructor of Error class for messages
	}
}