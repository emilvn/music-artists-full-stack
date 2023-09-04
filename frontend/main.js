/* ========== IMPORTS ========== */
import {displayArtists, displayFavorites} from "./view/view.js";
import {artists, getArtists} from "./model/artists.js";
import {setEventListeners} from "./controller/controller.js";
import {generateFilterOptions} from "./controller/filter.js";
import {showToastMessage} from "./view/helpers/toastmessages.js";
import {favoriteArtists, getFavorites} from "./model/favorites.js";

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