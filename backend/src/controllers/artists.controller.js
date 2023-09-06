import {v4 as uuidv4} from "uuid"; // 'uuid4' for generating unique artist ids
import {getArtists, writeArtistsToFile} from "../models/filesystem.js";
import {validateArtist} from "../validation/artist.validation.js";
import {HTTPException} from "../errors/HTTPException.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 *  ========== ROUTE HANDLERS ==========
 *  Route handlers for GET/POST/PUT/DELETE to /artists
 */
/**
 * ----- GET ALL ARTISTS -----
 * Route handler for GET
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function getArtistsData(req, res, next){
	try{
		const artists = await getArtists("data/artists.json");
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
 * ----- GET ONE ARTIST -----
 * Route handler for GET /:id
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function getSpecificArtist(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const artist = artists.find(artist => artist.id === id);
		if(!artist){ // error if artist doesn't exist in file
			next(new HTTPException("Artist not found", 404));
		}
		else{
			res.status(200).json(artist);
		}
	}
	catch (err){
		next(err);//forward the error to the error handler
	}
}

/**
 * ----- ADD ARTIST -----
 * Route handler for POST
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function addArtist(req, res, next){
	try{
		const artists = await getArtists("data/artists.json");
		const newArtist = req.body;
		validateArtist(newArtist);//throws ValidationError if invalid properties in newArtist
		newArtist.id = uuidv4();//give artist unique id
		artists.push(newArtist);
		await writeArtistsToFile(artists, `data/artists.json`);
		res.status(201).json(artists);
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}

/**
 * ----- UPDATE ARTIST -----
 * Route handler for PUT /:id
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function updateArtistData(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const artistToUpdate = artists.find(artist => artist.id === id);
		const body = req.body;
		if(!artistToUpdate){//error if artist doesn't exist in file
			next(new HTTPException("Artist not found", 404));
		}
		else{
			validateArtist(body);//throws ValidationError if invalid properties in body
			for(const key in artistToUpdate){ //update artist properties
				if(key !== "id"){
					artistToUpdate[key] = body[key];
				}
			}
			await writeArtistsToFile(artists, "data/artists.json");
			res.status(200).json(artists);
		}
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}

/**
 * ----- DELETE ARTIST -----
 * Route handler for DELETE /:id
 * @param {express.Request} req Incoming request object
 * @param {express.Response} res Response object, for sending response to client
 * @param {express.NextFunction} next Callback function to pass control to next middleware
 */
export async function deleteArtist(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		if(!artists.find(artist => artist.id === id)){ //error if artist doesn't exist in file
			next(new HTTPException("Artist not found", 404));
		}
		else{
			const updatedArtists = artists.filter(artist => artist.id !== id); //filter out artist to delete
			await writeArtistsToFile(updatedArtists, "data/artists.json");
			res.status(200).json(updatedArtists);
		}
	}
	catch(err){
		next(err);//forward the error to the error handler
	}
}