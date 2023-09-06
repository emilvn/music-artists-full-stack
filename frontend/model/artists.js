import {endpoint} from "../main.js";
import {selectedArtist} from "../controller/helpers/selectartist.js";

/**
 * global variable for locally caching artists fetched from the database
 * @type {Artist[]}
 */
export let artists = [];

/**
 * getArtists
 * function to fetch array of artists from the server and cache it in global variable
 */
export async function getArtists(){
	const response = await fetch(endpoint + "/artists")
	if(response.ok){
		artists = await response.json();
	}
	else{
		console.error(await response.json());
	}
}

/**
 *  getSpecificArtist
 *  function to fetch a specific artist from the server
 *  @param {Artist} artist artist to fetch
 *  @returns {Response} response object from the server
 */
export async function getSpecificArtist(artist){
	const response = await fetch(endpoint + "/artists/" + artist.id);
	if(!response.ok){
		console.error(await response.json());
	}
	return response;
}

/**
 *  addArtist
 *  function to add an artist on the server, and update the cached artists
 *  @param {Artist} artist artist to add
 *  @returns {Response} response object from the server
 */
export async function addArtist(artist){
	const response = await fetch(endpoint + "/artists", {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(artist)
	});
	if(response.ok){
		artists = await response.json();
	}
	else{
		console.error(await response.json());
	}
	return response;
}

/**
 * updateArtist
 * function to update a specific artist on the server, and update the cached artists
 * @param {Object} updatedArtist Artist object without the id
 * @returns {Response} response object from the server
 */
export async function updateArtist(updatedArtist){
	const artistToUpdate = artists.find(artist => artist.id === selectedArtist.id);

	for(const key in artistToUpdate){
		if(key !== "id"){
			artistToUpdate[key] = updatedArtist[key];
		}
	}
	const response = await fetch(endpoint + "/artists/" + selectedArtist.id, {
		method: "PUT",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(artistToUpdate)
	});
	if(!response.ok){
		console.error(await response.json());
	}
	return response;
}

/**
 * deleteArtist
 * function to delete a specific artist on the server, and update the cached artists
 * @param {Artist} artistToDelete Artist to delete from the server
 * @returns {Response} response object from the server
 */
export async function deleteArtist(artistToDelete){
	const response = await fetch(endpoint + "/artists/" + artistToDelete.id, {
		method: "DELETE"
	});
	if(response.ok){
		artists = await response.json();
	}
	else{
		console.error(await response.json());
	}
	return response;
}

/**
 * filterArtists
 * function to filter the locally cached array of artists based on the filter value
 * @param {string} filterValue value of the option selected by the user
 */
export function filterArtists(filterValue){
	artists = artists.filter(artist => artist.genres.map(genre =>
	genre.toLowerCase()).includes(filterValue));
}