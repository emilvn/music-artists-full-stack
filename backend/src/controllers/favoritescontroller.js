/* ========== IMPORTS ========== */
import {getArtists, writeArtistsToFile} from "./filesystem.js";

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