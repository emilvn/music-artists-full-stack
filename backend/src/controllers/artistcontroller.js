/* ========== IMPORTS ========== */
// 'uuidv4' function for generating unique IDs.//
import {v4 as uuidv4} from "uuid";
import {getArtists, writeArtistsToFile} from "./filesystem.js";

/* ========== ROUTE HANDLERS ========== */

/* ----- GET ALL ARTISTS ----- */
// Handler for getting all artists' data.//
export async function getArtistsData(req, res){
	const artists = await getArtists("data/artists.json");
	res.json(artists);
}

/* ----- GET ONE ARTIST ----- */
// Handler for getting data of a specific artist by ID.//
export async function getSpecificArtist(req, res){
	const id = req.params.id;
	const artists = await getArtists("data/artists.json");
	res.json(artists.find(artist => artist.id === id));
}

/* ----- ADD ARTIST ----- */
// Handler for adding a new artist's data.//
export async function addArtistData(req, res){
	const artists = await getArtists("data/artists.json");
	const newArtist = req.body;
	newArtist.id = uuidv4();
	artists.push(newArtist);
	await writeArtistsToFile(artists, "data/artists.json");

	res.json(artists);
}

/* ----- UPDATE ARTIST----- */
// Handler for updating an artist's data by ID.//
export async function updateArtistData(req, res){
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

/* ----- DELETE ARTIST ----- */
// Handler for deleting an artist by ID.//
export async function deleteArtist(req, res){
	const id = req.params.id;
	const artists = await getArtists("data/artists.json");

	// Filter out the artist with the specified ID to delete.//
	const updatedArtists = artists.filter(artist => artist.id !== id);

	await writeArtistsToFile(updatedArtists, "data/artists.json");
	res.json(updatedArtists);
}