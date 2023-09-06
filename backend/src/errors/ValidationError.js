// custom validation error //
export class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";
		this.statusCode = 400;
	}
}