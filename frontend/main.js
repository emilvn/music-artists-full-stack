/* ========== IMPORTS ========== */
import {displayArtists, displayFavorites, generateFilterOptions} from "./view/view.js";
import {artists, favoriteArtists, getArtists, getFavorites} from "./model/model.js";
import {setEventListeners} from "./controller/controller.js";

window.addEventListener("load", main);

// API endpoint for the server //
export const endpoint = "http://localhost:3333";

// Main function to fetch data and set event listeners //
async function main(){
	// fetch artists and save locally //
	await getFavorites();
	await getArtists();

	// generate options for filter select //
	generateFilterOptions();

	// display artists on page //
	displayArtists(artists);
	displayFavorites(favoriteArtists);

	// set event listeners for user interactions //
	setEventListeners();
}