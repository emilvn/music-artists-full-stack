// custom error class for http errors //
export class HTTPException extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.name = "HTTPException";
	}
}