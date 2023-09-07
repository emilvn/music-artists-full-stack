import fs from "fs/promises";
import {HTTPException} from "../errors/HTTPException.js";
import {findArtistObject, getArtistsData} from "./artist.model.js";

/**
 * path to favorites data
 * @type {string}
 */
const PATH = "data/favorites.json";

/**
 * writes array of artist ids to favorites file
 * @param {string[]} favoriteIds array of artist ids
 * @throws {HTTPException} if error writing to file
 */
export async function writeFavoritesToFile(favoriteIds){
	try{
		await fs.writeFile(PATH, JSON.stringify(favoriteIds, null, 2));
	}
	catch (err){
		throw new HTTPException(`Error writing to JSON file at ${PATH}: ${err.message}`, 500);
	}
}

/**
 * gets an array of artist ids from favorites file
 * @throws {HTTPException} if error reading file
 * @returns {Promise<string[]>} promise resolving in array of ids
 */
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

/**
 * function to check if artist id is already in favorites
 * @param {string} artistId artist id to check
 * @param {string[]} favoriteIds array of ids to check
 * @throws {HTTPException} if artist already in favorites
 */
function throwIfArtistIdInFavorites(artistId, favoriteIds){
	if(favoriteIds.includes(artistId)){
		throw new HTTPException("Artist already in favorites", 400);
	}
}

/**
 * function to check if artist id is in favorites
 * @param {string} artistId artist id to check
 * @param {string[]} favoriteIds array of ids to check
 * @throws {HTTPException} if artist is not in favorites
 */
function throwIfArtistIdNotInFavorites(artistId, favoriteIds){
	if(!favoriteIds.includes(artistId)){
		throw new HTTPException("Artist not in favorites", 404);
	}
}

/**
 * function to get artists in favorites
 * @throws {HTTPException} rethrows exception from getFavoriteIdsData and getArtistsData
 * @returns {Promise<Artist[]>} array of artists whose ids are in favorites
 */
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

/**
 * adds an artist id to favorites
 * @param {string} artistId id to add
 * @throws {HTTPException} rethrows errors from functions in try block
 */
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

/**
 * remove artist id from favorites
 * @param {string} artistId id to remove
 * @throws {HTTPException} rethrows errors from functions in try block
 */
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