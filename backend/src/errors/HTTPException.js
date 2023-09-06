/**
 * HTTPException
 * Custom class for handling HTTP errors
 * @class
 * @extends Error
 * @param {String} message error message for exception
 * @param {Number} statusCode HTTP status code for exception
 */
export class HTTPException extends Error {
	static name = "HTTPException";
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}