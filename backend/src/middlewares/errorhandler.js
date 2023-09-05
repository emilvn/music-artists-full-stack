export function errorHandler(err, req, res, _next){
	console.log("Middleware error handling");
	const status = err.statusCode || 500;
	const message = err.message ||"Something went wrong";
	res.status(status).json({
		success: false,
		status: status,
		message: message,
		stack: process.env.NODE_ENV === "development" ? err.stack : {}
	});
}