/* ========== IMPORTS ========== */
// 'fs' module for file system operations.//
import fs from "fs/promises";
// 'uuidv4' function for generating unique IDs.//
import {v4 as uuidv4} from "uuid";

/* ========== FUNCTION TO READ&WRITE ARTISTS DATA FROM A FILE ========== */

// function to read artist data from a JSON file.//
async function getArtists(path){
	const data = await fs.readFile(path);
	return JSON.parse(String(data));
}
// Function to write artist data to a JSON file.//
function writeArtistsToFile(artistsArr, path){
	fs.writeFile(path, JSON.stringify(artistsArr, null, 2));
}

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
	writeArtistsToFile(artists, "data/artists.json");

	res.json(artists);
}

/* ----- UPDATE ARTIST----- */
// Handler for updating an artist's data by ID.//
export async function updateArtistData(req, res){
	const id = req.params.id;
	const artists = await getArtists("data/artists.json");
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

	writeArtistsToFile(artists, "data/artists.json");
	res.json(artists);
}

/* ----- DELETE ARTIST ----- */
// Handler for deleting an artist by ID.//
export async function deleteArtist(req, res){
	const id = req.params.id;
	const artists = await getArtists("data/artists.json");

	// Filter out the artist with the specified ID to delete.//
	const updatedArtists = artists.filter(artist => artist.id !== id);

	writeArtistsToFile(updatedArtists, "data/artists.json");
	res.json(updatedArtists);
}

/* ----- GET ALL FAVORITES ----- */
// Handler for getting favorite artists' data.//
export async function getFavoritesData(req, res){
	const favorites = await getArtists("data/favorites.json");
	res.json(favorites);
}

/* ----- ADD TO FAVORITES ----- */
// Handler for adding an artist to favorites.//
export async function addFavorite(req, res){
	const favorites = await getArtists("data/favorites.json");
	const artist = req.body;

	// Check if the artist is not already in favorites before adding.//
	if(!favorites.find(favorite => favorite.id === artist.id)) {
		favorites.push(artist);
		writeArtistsToFile(favorites, "data/favorites.json");
	}
	res.json(favorites);
}

/* ----- REMOVE FROM FAVORITES ----- */
// Handler for removing an artist from favorites by ID.//
export async function removeFromFavorites(req, res){

	const favorites = await getArtists("data/favorites.json");
	const id = req.params.id;

	// Filter out the artist with the specified ID to remove from favorites.//
	const updatedFavorites = favorites.filter(artist => artist.id !== id);

	writeArtistsToFile(updatedFavorites, "data/favorites.json");
	res.json(updatedFavorites);
}