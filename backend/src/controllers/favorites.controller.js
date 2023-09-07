import {HTTPException} from "../errors/HTTPException.js";
// noinspection ES6UnusedImports
import express from "express";
import {addFavoriteData, getFavoritesData, removeFavoriteData} from "../models/favorite.model.js";

/**
 *  ========== ROUTE HANDLERS ==========
 *  Route handlers for GET/POST/PUT/DELETE to /favorites
 */
/**
 * ----- GET ALL FAVORITES -----
 * Route handler for GET
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function getFavorites(req, res, next){
	try{
		const favorites = await getFavoritesData();// can throw if error reading files
		res.status(200).json(favorites);
	}
	catch (err){
		next(err);//forward the error to the error handler
	}
}

/**
 * ----- ADD FAVORITE -----
 * Route handler for POST
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function addFavorite(req, res, next){
	try{
		const favoriteArtistId = req.body.id;
		const favorites = await addFavoriteData(favoriteArtistId); // throws error validating/reading/writing
		res.status(201).json(favorites);
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}
/**
 * ----- REMOVE FROM FAVORITES -----
 * Route handler for DELETE /:id
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function removeFavorite(req, res, next){
	try{
		const id = req.params.id;
		const favorites = await removeFavoriteData(id); // throws if artist not found or error reading/writing
		res.status(200).json(favorites);
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}

