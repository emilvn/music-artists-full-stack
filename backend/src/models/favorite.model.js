import fs from "fs/promises";
import {HTTPException} from "../errors/HTTPException.js";
import {findArtistObject, getArtistsData} from "./artist.model.js";

const PATH = "data/favorites.json";

export async function writeFavoritesToFile(favoriteIds){
	try{
		await fs.writeFile(PATH, JSON.stringify(favoriteIds, null, 2));
	}
	catch (err){
		throw new HTTPException(`Error writing to JSON file at ${PATH}: ${err.message}`, 500);
	}
}

export async function getFavoriteIdsData(){
	try{
		const data = await fs.readFile(PATH);
		return JSON.parse(String(data));
	}
	catch (err){
		throw new HTTPException(`Error reading/parsing JSON file at ${PATH}: ${err.message}`, 500);
	}
}

/**
 * getFavorites
 * gets array of artists whose ids are in favoriteIds
 * @param {string[]} favoriteIDs array of artist id's
 * @param {Artist[]} artists array of Artist objects
 * @returns {Artist[]} array of Artist objects
 */
export function getArtistsInFavorites(favoriteIDs, artists){
	const favorites = [];
	for(const id of favoriteIDs){
		const favoriteArtist = artists.find(artist => artist.id === id);
		favorites.push(favoriteArtist);
	}
	return favorites;
}


function throwIfArtistIdInFavorites(artistId, favoriteIds){
	if(favoriteIds.includes(artistId)){
		throw new HTTPException("Artist already in favorites", 400);
	}
}

function throwIfArtistIdNotInFavorites(artistId, favoriteIds){
	if(!favoriteIds.includes(artistId)){
		throw new HTTPException("Artist not in favorites", 404);
	}
}

export async function getFavoritesData(){
	try {
		const favoriteIds = await getFavoriteIdsData(); // can throw if error reading file
		const artists = await getArtistsData(); // can throw if error reading file
		return getArtistsInFavorites(favoriteIds, artists);
	}
	catch (err){
		throw err;
	}
}

export async function addFavoriteData(artistId){
	try{
		const favoriteIds = await getFavoriteIdsData(); // throws if error reading file
		const artists = await getArtistsData(); // throws if error reading file
		throwIfArtistIdInFavorites(artistId, favoriteIds); // throws if artist already in favorites
		findArtistObject(artists, artistId); // throws if artist doesn't exist in artists
		favoriteIds.push(artistId);
		await writeFavoritesToFile(favoriteIds); // throws if error writing to file
		return getArtistsInFavorites(favoriteIds, artists);
	}
	catch(err){
		throw err;
	}
}


export async function removeFavoriteData(artistId){
	try{
		const artists = await getArtistsData(); // throws if error reading file
		const favoriteIds = await getFavoriteIdsData(); // throws if error reading file
		throwIfArtistIdNotInFavorites(artistId, favoriteIds); // throws if artist id not in favorites
		const updatedFavoriteIds = favoriteIds.filter(id => id !== artistId);
		await writeFavoritesToFile(updatedFavoriteIds);
		return getArtistsInFavorites(updatedFavoriteIds, artists);
	}
	catch(err){
		throw err;
	}
}