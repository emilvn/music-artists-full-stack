import {Request, Response, NextFunction} from "express";

/**
 * errorHandler
 * middleware for handling errors that occur in the route handlers
 * @param {Error|ValidationError|HTTPException} err Error object to be handled
 * @param {Request} req Incoming request object
 * @param {Response} res Response object, for sending response to client
 * @param {NextFunction} _next Callback function to pass control to next middleware
 */
export function errorHandler(err, req, res, _next){
	const status = err.statusCode || 500;
	const message = err.message ||"Something went wrong";
	const name = err.name || "";
	res.status(status).json({
		success: false,
		name: name,
		status: status,
		message: message
	});
}

