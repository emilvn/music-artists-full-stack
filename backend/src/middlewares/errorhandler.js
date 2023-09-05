// error handler, gets called if a route handler throws an error //
export function errorHandler(err, req, res, _next){
	const status = err.statusCode || 500;
	const message = err.message ||"Something went wrong";
	// error status code and message sent as response //
	res.status(status).json({
		success: false,
		status: status,
		message: message,
	});
}