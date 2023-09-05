/* ========== IMPORTS ========== */
// 'uuidv4' function for generating unique IDs.//
import {v4 as uuidv4} from "uuid";
import {getArtists, writeArtistsToFile} from "../helpers/filesystem.js";

/* ========== ROUTE HANDLERS ========== */
/* ----- GET ALL ARTISTS ----- */
// Handler for getting all artists' data.//
export async function getArtistsData(req, res, next){
	try{
		const type = req.params.type;
		const artists = await getArtists(`data/${type}.json`);
		res.json(artists);
	}
	catch (err){
		next(err);
	}
}

/* ----- GET ONE ARTIST ----- */
// Handler for getting data of a specific artist by ID.//
export async function getSpecificArtist(req, res, next){
	try{
		const {type, id} = req.params;
		const artists = await getArtists(`data/${type}.json`);
		res.json(artists.find(artist => artist.id === id));
	}
	catch (err){
		next(err);
	}
}

/* ----- ADD ARTIST ----- */
// Handler for adding a new artist's data.//
export async function addArtistData(req, res, next){
	try{
		const type = req.params.type;
		const artists = await getArtists(`data/${type}.json`);
		const newArtist = req.body;
		if(type === "artists"){
			newArtist.id = uuidv4();
			artists.push(newArtist);
		}
		else if(type === "favorites" && !artists.find(favorite => favorite.id === newArtist.id)){
			artists.push(newArtist);
		}
		await writeArtistsToFile(artists, `data/${type}.json`);

		res.json(artists);
	}
	catch(err){
		next(err);
	}
}

/* ----- UPDATE ARTIST----- */
// Handler for updating an artist's data by ID.//
export async function updateArtistData(req, res, next){
	try{
		const {type, id} = req.params;
		const artists = await getArtists(`data/${type}.json`);
		const artistToUpdate = artists.find(artist => artist.id === id);
		const body = req.body;

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
		res.json(artists);
	}
	catch(err){
		next(err);
	}
}

/* ----- DELETE ARTIST ----- */
// Handler for deleting an artist by ID.//
export async function deleteArtist(req, res, next){
	try{
		const {type, id} = req.params;
		const artists = await getArtists(`data/${type}.json`);

		// Filter out the artist with the specified ID to delete.//
		const updatedArtists = artists.filter(artist => artist.id !== id);

		await writeArtistsToFile(updatedArtists, `data/${type}.json`);
		res.json(updatedArtists);
	}
	catch(err){
		next(err);
	}
}