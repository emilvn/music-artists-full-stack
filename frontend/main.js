import {displayArtists, displayFavorites} from "./view/view.js";
import {artists, getArtists} from "./model/artists.js";
import {setInitialEventListeners} from "./controller/seteventlisteners.js";
import {generateFilterOptions} from "./controller/search-filter-sort/filter.js";
import {showToastMessage} from "./view/helpers/toastmessages.js";
import {favoriteArtists, getFavorites} from "./model/favorites.js";
import {sortAlphabetically} from "./controller/search-filter-sort/sort.js";
import {setTooltips} from "./controller/settooltips.js";

// main is run on page load
window.addEventListener("load", main);

/**
 * Server endpoint
 * @type string
 */
export const endpoint = "http://localhost:3333";

/**
 * Main function to initialize app
 * gets artists and favorites, sets initial event listeners/tooltips,
 * and sorts the artists alphabetically
 */
async function main(){
	// fetch artists
	try{
		await getFavorites();
		await getArtists();
	}
	catch (err){
		showToastMessage(err.message||"Failed getting artists", "error", null);
		console.error({"Error getting artist: ": err});
	}
	// generate options for filter select
	generateFilterOptions();

	// display artists on page
	displayArtists(artists);
	displayFavorites(favoriteArtists);

	// initial event listeners and tooltips
	setInitialEventListeners();
	setTooltips();

	// initial sorting
	sortAlphabetically();
}