import {
	addArtistData, deleteArtistData,
	getArtistsData,
	getOneArtistData,
	updateArtistData,
} from "../models/artist.model.js";
import {HTTPException} from "../errors/HTTPException.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 *  ========== ROUTE HANDLERS ==========
 *  Route handlers for GET/POST/PUT/DELETE to /artists
 */

/**
 * Route handler for GET
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function getArtists(req, res, next){
	try{
		const artists = await getArtistsData();
		if(artists.length === 0){ // error if there are no artists
			next(new HTTPException("Artists not found", 404));
		}
		else{
			res.status(200).json(artists);
		}
	}
	catch (err){
		next(err);//forward the error to the error handler
	}
}

/**
 * Route handler for GET /:id
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function getSpecificArtist(req, res, next){
	try{
		const id = req.params.id;
		const artist = await getOneArtistData(id);
		res.status(200).json(artist);
	}
	catch (err){
		next(err);//forward the error to the error handler
	}
}

/**
 * Route handler for POST
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function addArtist(req, res, next){
	try{
		const newArtist = req.body;
		const artists = await addArtistData(newArtist);
		res.status(201).json(artists);
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}

/**
 * Route handler for PUT /:id
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function updateArtist(req, res, next){
	try{
		const updatedArtist = req.body;
		const artists = await updateArtistData(updatedArtist);
		res.status(200).json(artists);
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}

/**
 * Route handler for DELETE /:id
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function deleteArtist(req, res, next){
	try{
		const id = req.params.id;
		const updatedArtists = await deleteArtistData(id);
		res.status(200).json(updatedArtists);
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}