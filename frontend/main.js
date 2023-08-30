/* ========== IMPORTS ========== */
import {
	displayArtists,
	displayFavorites, filterArtists,
	generateFilterOptions,
	inputSearchChanged,
	inputSortChanged,
	showCreateDialog
} from "./modules/display.js";
import {artists, favoriteArtists, getArtists, getFavorites} from "./modules/requests.js";

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

// set event listeners for buttons and search/sort //
function setEventListeners(){
	// add artist button //
	document.querySelector("#add-artist-dialog-button")
		.addEventListener("click", showCreateDialog);

	// search bar //
	const searchBar = document.querySelector("#artist-search");
	searchBar.addEventListener("search", inputSearchChanged);
	searchBar.addEventListener("keyup", inputSearchChanged);

	// sort select //
	document.querySelector("#artist-sort")
		.addEventListener("change", inputSortChanged);

	document.querySelector("#artist-filter-by__genre")
		.addEventListener("change", filterArtists);
}