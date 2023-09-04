/* ========== IMPORTS ========== */
import {displayArtists, displayFavorites, generateFilterOptions, showToastMessage} from "./view/view.js";
import {artists, favoriteArtists, getArtists, getFavorites} from "./model/model.js";
import {setEventListeners} from "./controller/controller.js";

window.addEventListener("load", main);

// API endpoint for the server //
export const endpoint = "http://www.emilvn-ubuntu.dk:3333";

// Main function to fetch data and set event listeners //
async function main(){
	// fetch artists and save locally //
	try{
		await getFavorites();
		await getArtists();
	}
	catch (err){
		showToastMessage(`Oops, something went wrong.`, "error");
		console.error(err);
	}

	// generate options for filter select //
	generateFilterOptions();

	// display artists on page //
	displayArtists(artists);
	displayFavorites(favoriteArtists);

	// set event listeners for user interactions //
	setEventListeners();
}