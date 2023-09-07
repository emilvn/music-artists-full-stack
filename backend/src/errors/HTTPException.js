/**
 * Custom class for handling HTTP errors
 * @class
 * @extends Error
 * @param {string} message error message for exception
 * @param {number} statusCode HTTP status code for exception
 */
export class HTTPException extends Error {
	static name = "HTTPException";
	constructor(message, statusCode) {
		super(message);//uses the constructor of Error class for messages
		this.statusCode = statusCode;
	}
}