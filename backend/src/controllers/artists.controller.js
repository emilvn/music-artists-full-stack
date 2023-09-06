/* ========== IMPORTS ========== */
// 'uuidv4' function for generating unique IDs.//
import {v4 as uuidv4} from "uuid";
import {getArtists, writeArtistsToFile} from "../helpers/filesystem.js";
import {validateArtist} from "../model/artist.validation.js";
import {HTTPException} from "../errors/HTTPException.js";

/* ========== ROUTE HANDLERS ========== */

/* ----- GET ALL ----- */
// Handler for getting all artists/favorites data.//
export async function getArtistsData(req, res, next){
	try{
		const artists = await getArtists("data/artists.json");
		// if artists/favorites array is empty, responds with an error //
		if(artists.length === 0){
			next(new HTTPException("Artists not found", 404));
		}
		else{
			res.status(200).json(artists);
		}
	}
	catch (err){
		//forwards the error to the error handler middleware //
		next(err);
	}
}

/* ----- GET ONE ----- */
// Handler for getting data of a specific artist/favorite by ID.
export async function getSpecificArtist(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const artist = artists.find(artist => artist.id === id);
		// if no artist exists with given id, respond with an error //
		if(!artist){
			next(new HTTPException("Artist not found", 404));
		}
		else{
			res.status(200).json(artist);
		}
	}
	catch (err){
		next(err);
	}
}

/* ----- ADD ----- */
// Handler for adding a new artist's/favorites data.
export async function addArtist(req, res, next){
	try{
		const artists = await getArtists("data/artists.json");
		const newArtist = req.body;
		validateArtist(newArtist);
		newArtist.id = uuidv4();
		artists.push(newArtist);
		await writeArtistsToFile(artists, `data/artists.json`);
		res.status(201).json(artists);
	}
	catch(err){
		next(err);
	}
}

/* ----- UPDATE ----- */
// Handler for updating an artist's/favorites data by ID.//
export async function updateArtistData(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const artistToUpdate = artists.find(artist => artist.id === id);
		const body = req.body;
		// if no artist could be found with given id, responds with an error //
		if(!artistToUpdate){
			next(new HTTPException("Artist not found", 404));
		}
		else{
			validateArtist(body);
			// Update artist properties with new data from the request body.//
			for(const key in artistToUpdate){
				if(key !== "id"){
					artistToUpdate[key] = body[key];
				}
			}
			await writeArtistsToFile(artists, "data/artists.json");
			res.status(200).json(artists);
		}
	}
	catch(err){
		next(err);
	}
}

/* ----- DELETE ----- */
// Handler for deleting an artist/favorite by ID.//
export async function deleteArtist(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		// If no artist could be found with given id, responds with an error //
		if(!artists.find(artist => artist.id === id)){
			next(new HTTPException("Artist not found", 404));
		}
		else{
			// Filter out the artist with the specified ID to delete.//
			const updatedArtists = artists.filter(artist => artist.id !== id);
			await writeArtistsToFile(updatedArtists, "data/artists.json");
			res.status(200).json(updatedArtists);
		}
	}
	catch(err){
		next(err);
	}
}