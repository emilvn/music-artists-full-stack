/* ========== IMPORTS ========== */
// 'fs' module for file system operations.//
import fs from "fs/promises";

/* ========== FUNCTION TO READ&WRITE ARTISTS DATA FROM A FILE ========== */

// function to read artist data from a JSON file.//
export async function getArtists(path){
	const data = await fs.readFile(path);
	return JSON.parse(String(data));
}
// Function to write artist data to a JSON file.//
export function writeArtistsToFile(artistsArr, path){
	fs.writeFile(path, JSON.stringify(artistsArr, null, 2));
}