/* ========== IMPORTS ========== */
import {displayArtists, displayFavorites} from "./view/view.js";
import {artists, getArtists} from "./model/artists.js";
import {setInitialEventListeners} from "./controller/seteventlisteners.js";
import {generateFilterOptions} from "./controller/search-filter-sort/filter.js";
import {showToastMessage} from "./view/helpers/toastmessages.js";
import {favoriteArtists, getFavorites} from "./model/favorites.js";
import {sortAlphabetically} from "./controller/search-filter-sort/sort.js";
import {setTooltips} from "./controller/settooltips.js";

window.addEventListener("load", main);

// API endpoint for the server //
export const endpoint = "http://localhost:3333";

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

	// initial event listeners and tooltips //
	setInitialEventListeners();
	setTooltips();

	// initial sorting //
	sortAlphabetically();
}