import fs from "fs/promises";
import {HTTPException} from "../errors/HTTPException.js";
import {validateArtist} from "../validation/artist.validation.js";
import {v4 as uuidv4} from "uuid";

/**
 * path to artists data
 * @type {string}
 */
const PATH = "data/artists.json";

/**
 * writes array of objects to file
 * @param {Artist[]} artistsArr array of artist objects
 * @throws {HTTPException} if there is an error writing to the file
 * */
export async function writeArtistsToFile(artistsArr){
	try{
		await fs.writeFile(PATH, JSON.stringify(artistsArr, null, 2));
	}
	catch (err){
		throw new HTTPException(`Error writing to JSON file at ${PATH}: ${err.message}`, 500);
	}
}

/**
 * Reads json data from file and parses it to js
 * @returns {Promise<any>} promise that resolves as parsed json from file
 * @throws {HTTPException} if there is an error reading file or parsing the data
 * @returns {Promise<Artist[]>} array of artist objects from file
 */
export async function getArtistsData(){
	try{
		const data = await fs.readFile(PATH);
		return JSON.parse(String(data));
	}
	catch (err){
		throw new HTTPException(`Error reading/parsing JSON file at ${PATH}: ${err.message}`, 500);
	}
}

/**
 * finds an artist by id in an array
 * @param {Artist[]} artists array of artists
 * @param {string} id id of artist to find
 * @throws {HTTPException} if artist not found
 * @returns {Artist} artist object found
 */
export function findArtistObject(artists, id){
	const artist = artists.find(artist => artist.id === id);
	if(!artist){
		throw new HTTPException("Artist not found", 404);
	}
	return artist;
}

/**
 * updates an artist object with the updated details of another artist object
 * @param {Artist} artistToUpdate the artist object to update details of
 * @param {Artist} updatedArtist the artist object to update details from
 */
function updateArtistDetails(artistToUpdate, updatedArtist){
	for(const key in artistToUpdate){ //update artist properties
		if(key !== "id"){
			artistToUpdate[key] = updatedArtist[key];
		}
	}
}

/**
 * gets a specific artist object from database by id
 * @param {string} artistId id of artist to get
 * @throws {HTTPException} if artist doesn't exist, or error reading/writing
 * @returns {Promise<Artist>} artist object found
 */
export async function getOneArtistData(artistId){
	try {
		const artists = await getArtistsData(); // can throw if error reading file
		return findArtistObject(artists, artistId); // throws if artist not found
	}
	catch (err){
		throw err;
	}

}

/**
 * adds an artist object to file
 * @param {Object} newArtist object containing artist details for artist to be created
 * @throws {ValidationError} if artist details are invalid
 * @returns {Promise<Artist[]>} array of artists including the newly added artist
 */
export async function addArtistData(newArtist){
	try{
		const artists = await getArtistsData(); // can throw if error reading file
		validateArtist(newArtist);//throws ValidationError if invalid properties in newArtist
		newArtist.id = uuidv4();//give artist unique id
		artists.push(newArtist);
		await writeArtistsToFile(artists); // can throw if error writing to file
		return artists;
	}
	catch(err){
		throw err;
	}
}

/**
 * updates artist details in file
 * @param {Artist} updatedArtist artist to update with updated details
 * @throws {HTTPException} if artist doesn't exist, or error reading/writing
 * @throws {ValidationError} if invalid artist properties
 * @returns {Promise<Artist[]>} array of artists including the updated artist details
 */
export async function updateArtistData(updatedArtist){
	try{
		const artists = await getArtistsData(); // can throw if error reading file
		const artistToUpdate = findArtistObject(artists, updatedArtist.id); // throws if artist not found
		validateArtist(updatedArtist);//throws ValidationError if invalid properties in body
		updateArtistDetails(artistToUpdate, updatedArtist);
		await writeArtistsToFile(artists); // can throw if error writing to file
		return artists;
	}
	catch (err){
		throw err;
	}
}

/**
 * deletes artist with id from file
 * @param {string} artistId unique identifier string of artist to delete
 * @throws {HTTPException} if artist doesn't exist, or error reading/writing
 */
export async function deleteArtistData(artistId){
	try{
		const artists = await getArtistsData(); // can throw if error reading file
		findArtistObject(artists, artistId); //throws if artist not found
		const updatedArtists = artists.filter(artist => artist.id !== artistId); //filter docs artist to delete
		await writeArtistsToFile(updatedArtists); // can throw if error writing to file
		return updatedArtists;
	}
	catch (err){
		throw err;
	}
}