import {getArtists, writeArtistsToFile} from "../helpers/filesystem.js";
import {getFavorites} from "../helpers/getfavorites.js";
import {HTTPException} from "../errors/HTTPException.js";
import {Request, Response, NextFunction} from "express";

/**
 *  ========== ROUTE HANDLERS ==========
 *  Route handlers for GET/POST/PUT/DELETE to /favorites
 */
/**
 * ----- GET ALL FAVORITES -----
 * Route handler for GET
 * @param {Request} req Incoming request object
 * @param {Response} res Response object, for sending response to client
 * @param {NextFunction} next Callback function to pass control to next middleware
 */
export async function getFavoritesData(req, res, next){
	try{
		const artists = await getArtists("data/artists.json");
		const favoriteIDs = await getArtists("data/favorites.json");
		if(artists.length === 0){//error if there are no artists
			next(new HTTPException("No favorites", 404));
		}
		else{
			const favorites = getFavorites(favoriteIDs, artists);//get array of favorites from ids
			res.status(200).json(favorites);
		}
	}
	catch (err){
		next(err);//forward the error to the error handler
	}
}
/**
 * ----- GET ONE FAVORITE -----
 * Route handler for GET /:id
 * @param {Request} req Incoming request object
 * @param {Response} res Response object, for sending response to client
 * @param {NextFunction} next Callback function to pass control to next middleware
 */
export async function getSpecificFavorite(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const favoriteIds = await getArtists("data/favorites.json");
		if(!favoriteIds.includes(id)){//error if id not in file
			next(new HTTPException("Artist not in favorites", 400));
		}
		else{
			const favorite = artists.find(artist => artist.id === id);
			res.status(200).json(favorite);
		}
	}
	catch (err){
		next(err);//forward the error to the error handler
	}
}
/**
 * ----- ADD FAVORITE -----
 * Route handler for POST
 * @param {Request} req Incoming request object
 * @param {Response} res Response object, for sending response to client
 * @param {NextFunction} next Callback function to pass control to next middleware
 */
export async function addFavorite(req, res, next){
	try{
		const favoriteIds = await getArtists("data/favorites.json");
		const artists = await getArtists("data/artists.json");
		const favoriteArtist = req.body;

		if(favoriteIds.find(favoriteId => favoriteId === favoriteArtist.id)){ // error if id already in file
			next(new HTTPException("Artist is already in favorites", 400));
		}
		else if(!artists.find(artist => artist.id === favoriteArtist.id)){ // error if artist with id doesn't exist
			next(new HTTPException("Artist not found", 404));
		}
		else{
			favoriteIds.push(favoriteArtist.id);
			const favorites = getFavorites(favoriteIds, artists);//get array of favorites from ids
			await writeArtistsToFile(favoriteIds, "data/favorites.json");
			res.status(201).json(favorites);
		}
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}
/**
 * ----- REMOVE FROM FAVORITES -----
 * Route handler for DELETE /:id
 * @param {Request} req Incoming request object
 * @param {Response} res Response object, for sending response to client
 * @param {NextFunction} next Callback function to pass control to next middleware
 */
export async function removeFavorite(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const favoriteIds = await getArtists("data/favorites.json");
		if(!favoriteIds.includes(id)){//error if id not in file
			next(new HTTPException("Artist not in favorites", 400));
		}
		else{
			const updatedFavoriteIds = favoriteIds.filter(favoriteId => favoriteId !== id); //filter out id to remove
			const favorites = getFavorites(updatedFavoriteIds, artists);//get array of favorites from ids
			await writeArtistsToFile(updatedFavoriteIds, "data/favorites.json");
			res.status(200).json(favorites);
		}
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}

