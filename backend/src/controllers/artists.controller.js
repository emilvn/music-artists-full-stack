/* ========== IMPORTS ========== */
// 'uuidv4' function for generating unique IDs.//
import {v4 as uuidv4} from "uuid";
import {getArtists, writeArtistsToFile} from "../helpers/filesystem.js";

/* ========== ROUTE HANDLERS ========== */

/* ----- GET ALL ----- */
// Handler for getting all artists/favorites data.//
export async function getArtistsData(req, res, next){
	try{
		const type = req.params.type;
		const artists = await getArtists(`data/${type}.json`);
		// if artists/favorites array is empty, responds with an error //
		if(artists.length === 0){
			res.status(404).json({error: `${type} not found`});
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
// Handler for getting data of a specific artist/favorite by ID.//
export async function getSpecificArtist(req, res, next){
	try{
		const {type, id} = req.params;
		const artists = await getArtists(`data/${type}.json`);
		const artist = artists.find(artist => artist.id === id);
		// if no artist exists with given id, responds with an error //
		if(!artist){
			res.status(404).json({"error" : "Not found"});
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
// Handler for adding a new artist's/favorites data.//
export async function addArtistData(req, res, next){
	try{
		const type = req.params.type;
		const artists = await getArtists(`data/${type}.json`);
		const newArtist = req.body;
		// if URI is /artists //
		if(type === "artists"){
			// If artist already exists on database, responds with an error //
			if(artists.find(artist => artist.name.toLowerCase() === newArtist.name.toLowerCase())){
				res.status(400).json({"error":"Artist already exists"});
			}
			else{
				newArtist.id = uuidv4();
				artists.push(newArtist);
			}
		}
		// if URI is /favorites //
		else if(type === "favorites" && !artists.find(favorite => favorite.id === newArtist.id)){
			artists.push(newArtist);
		}
		await writeArtistsToFile(artists, `data/${type}.json`);
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
		const {type, id} = req.params;
		const artists = await getArtists(`data/${type}.json`);
		const artistToUpdate = artists.find(artist => artist.id === id);
		const body = req.body;
		// if no artist could be found with given id, responds with an error //
		if(!artistToUpdate){
			res.status(404).json({error: "Artist not found"});
		}
		else{
			// Update artist properties with new data from the request body.//
			artistToUpdate.name = body.name;
			artistToUpdate.birthdate = body.birthdate;
			artistToUpdate.activeSince = body.activeSince;
			artistToUpdate.genres = body.genres;
			artistToUpdate.labels = body.labels;
			artistToUpdate.website = body.website;
			artistToUpdate.roles = body.roles;
			artistToUpdate.image = body.image;
			artistToUpdate.shortDescription = body.shortDescription;

			await writeArtistsToFile(artists, `data/${type}.json`);
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
		const {type, id} = req.params;
		const artists = await getArtists(`data/${type}.json`);
		// If no artist could be found with given id, responds with an error //
		if(!artists.find(artist => artist.id === id)){
			res.status(404).json({error: "Artist not found"});
		}
		else{
			// Filter out the artist with the specified ID to delete.//
			const updatedArtists = artists.filter(artist => artist.id !== id);

			await writeArtistsToFile(updatedArtists, `data/${type}.json`);
			res.status(200).json(updatedArtists);
		}
	}
	catch(err){
		next(err);
	}
}