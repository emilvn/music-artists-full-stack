// error handler, gets called if a route handler throws an error //
export function errorHandler(err, req, res, _next){
	const status = err.statusCode || 500;
	const message = err.message ||"Something went wrong";
	const name = err.name || "";
	// error status code and message sent as response //
	res.status(status).json({
		success: false,
		name: name,
		status: status,
		message: message
	});
}

// custom error class for http errors //
export class HTTPException extends Error{
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.name = "HTTPException";
	}
}