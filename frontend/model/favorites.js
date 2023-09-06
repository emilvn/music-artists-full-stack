import {endpoint} from "../main.js";

/**
 * global variable for locally caching favorite artists fetched from the database
 * @type {Artist[]}
 */
export let favoriteArtists = [];


/**
 * getFavorites
 * function to fetch favorite artists from the server and cache it in global variable
 */
export async function getFavorites() {
	const response = await fetch(endpoint + "/favorites");
	if (response.ok) {
		favoriteArtists = await response.json();
	}
	else {
		console.error(await response.json());
	}
}

/**
 * addToFavorites
 * function to add an artist to favorites on the server, and update the cached favorites
 * @param {Artist} artist artist to add to favorites
 * @returns {Response} response object from server
 */
export async function addToFavorites(artist) {
	const response = await fetch(endpoint + "/favorites", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(artist)
	});
	if (response.ok) {
		favoriteArtists = await response.json();
	}
	else {
		console.error(await response.json());
	}
	return response;
}

/**
 * removeFromFavorites
 * function to remove an artist from favorites on the server, and update the cached favorites
 * @param {Artist} artistToRemove artist to remove from favorites
 * @returns {Response} response object from server
 */
export async function removeFromFavorites(artistToRemove) {
	const response = await fetch(endpoint + "/favorites/" + artistToRemove.id, {
		method: "DELETE"
	});
	if (response.ok) {
		favoriteArtists = await response.json();
	}
	else {
		console.error(await response.json());
	}
	return response;
}

/**
 * filterFavorites
 * function to filter the locally cached array of favorites based on the filter value
 * @param {string} filterValue value of the option selected by the user
 */
export function filterFavorites(filterValue){
	favoriteArtists = favoriteArtists.filter(artist =>
		artist.genres.map(genre => genre.toLowerCase()).includes(filterValue));
}