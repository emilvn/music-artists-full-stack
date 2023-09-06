import {getArtists, writeArtistsToFile} from "../helpers/filesystem.js";
import {HTTPException} from "../middlewares/errorhandler.js";
import {validateArtist} from "../model/artist.validation.js";

/* ----- GET ALL ----- */
// Handler for getting all favorites data.//
export async function getFavoritesData(req, res, next){
	try{
		const artists = await getArtists("data/artists.json");
		const favoriteIDs = await getArtists("data/favorites.json");
		// if artists/favorites array is empty, responds with an error //
		if(artists.length === 0){
			next(new HTTPException("No favorites", 404));
		}
		else{
			const favorites = getFavorites(favoriteIDs, artists);
			res.status(200).json(favorites);
		}
	}
	catch (err){
		//forwards the error to the error handler middleware //
		next(err);
	}
}
/* ----- GET ONE ----- */
// Handler for getting data of a specific favorite by ID.
export async function getSpecificFavorite(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const favoriteIds = await getArtists("data/favorites.json");
		// if the artist id is not in favorites, respond with an error //
		if(!artists.find(artist => artist.id === id)){
			next(new HTTPException("Artist not found", 404));
		}
		else if(!favoriteIds.includes(id)){
			next(new HTTPException("Artist not in favorites", 400));
		}
		else{
			const favorite = artists.find(artist => artist.id === id);
			res.status(200).json(favorite);
		}
	}
	catch (err){
		next(err);
	}
}

// handler for adding artist to favorites
export async function addFavorite(req, res, next){
	try{
		const favoriteIds = await getArtists("data/favorites.json");
		const artists = await getArtists("data/artists.json");
		const favoriteArtist = req.body;

		if(favoriteIds.find(favoriteId => favoriteId === favoriteArtist.id)){ // artist cant be already in favorites
			next(new HTTPException("Artist is already in favorites", 400));
		}
		else if(!artists.find(artist => artist.id === favoriteArtist.id)){ // artist must be in artists already
			next(new HTTPException("Artist not found", 404));
		}
		else{
			favoriteIds.push(favoriteArtist.id);
			const favorites = getFavorites(favoriteIds, artists);
			await writeArtistsToFile(favoriteIds, "data/favorites.json");
			res.status(201).json(favorites);
		}
	}
	catch(err){
		next(err);
	}
}

/* ----- DELETE ----- */
// Handler for deleting an artist/favorite by ID.//
export async function removeFavorite(req, res, next){
	try{
		const id = req.params.id;
		const artists = await getArtists("data/artists.json");
		const favoriteIds = await getArtists("data/favorites.json");
		// If no artist could be found with given id, responds with an error //
		if(!artists.find(artist => artist.id === id)){
			next(new HTTPException("Artist not found", 404));
		}
		else if(!favoriteIds.includes(id)){
			next(new HTTPException("Artist not in favorites", 400));
		}
		else{
			// Filter out the artist with the specified ID to delete.//
			const updatedFavoriteIds = favoriteIds.filter(favoriteId => favoriteId !== id);
			const favorites = getFavorites(updatedFavoriteIds, artists);
			await writeArtistsToFile(updatedFavoriteIds, "data/favorites.json");
			res.status(200).json(favorites);
		}
	}
	catch(err){
		next(err);
	}
}

function getFavorites(favoriteIDs, artists){
	const favorites = [];
	for(const id of favoriteIDs){
		const favoriteArtist = artists.find(artist => artist.id === id);
		favorites.push(favoriteArtist);
	}
	return favorites;
}