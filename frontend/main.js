/* ========== IMPORTS ========== */
import {displayArtists, displayFavorites, inputSearchChanged, inputSortChanged, showCreateDialog, showUpdateDialog} from "./display.js";
import {artists, favoriteArtists, getArtists, getFavorites} from "./requests.js";

window.addEventListener("load", main);

// API endpoint for the server //
export const endpoint = "http://localhost:3333";

export let selectedArtist;

// Main function to fetch data and set event listeners //
async function main(){
	// fetch artists and save locally //
	await getFavorites();
	await getArtists();

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
}

// Selects an artist and populates the update form with artist details. //
export function selectArtist(artist){
	selectedArtist = artist;
	const form = document.querySelector("#form-update");
	form.name.value = artist.name;
	form.birthdate.value = artist.birthdate;
	form.activeSince.value = artist.activeSince;
	form.image.value = artist.image;
	form.genres.value = String(artist.genres);
	form.labels.value = String(artist.labels);
	form.roles.value = String(artist.roles);
	form.website.value = artist.website;
	form.shortDescription.value = artist.shortDescription;
	showUpdateDialog();
}

