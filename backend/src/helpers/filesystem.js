import fs from "fs/promises";// 'fs' module for file system operations.

/**
 * getArtists
 * Reads json data from file and parses it to js
 * @param {string} path path for file to read from
 * @returns {Promise<any>} promise that resolves as parsed json from file
 * @throws {Error} if there is an error reading or parsing the data
 */
export async function getArtists(path){
	try{
		const data = await fs.readFile(path);
		return JSON.parse(String(data));
	}
	catch (err){
		throw new Error(`Error reading/parsing JSON file at ${path}: ${err.message}`);
	}
}
/**
 * writeArtistsToFile
 * writes array of objects to file
 * @param {Artist[]} artistsArr array of artist objects
 * @param {String} path path for file to write to
 * @throws {Error} if there is an error writing to the file
 * */
export async function writeArtistsToFile(artistsArr, path){
	try{
		await fs.writeFile(path, JSON.stringify(artistsArr, null, 2));
	}
	catch (err){
		throw new Error(`Error writing to JSON file at ${path}: ${err.message}`);
	}
}