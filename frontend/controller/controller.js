/* ========== IMPORTS ========== */
import {
	addArtist,
	addToFavorites,
	artists,
	deleteArtist,
	favoriteArtists,
	removeFromFavorites,
	updateArtist
} from "../model/model.js";
import {
	displayArtists, displayFavorites,
	filterArtists,
	inputSearchChanged,
	inputSortChanged, scrollToTop,
	showCreateDialog, showToastMessage,
	showUpdateDialog
} from "../view/view.js";

export let selectedArtist;

// set event listeners for buttons and search/sort //
export function setEventListeners(){
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

/* ========== CREATE ========== */

// Function to handle the submission of a new artist //
export async function submitArtistCreate(event){
	event.preventDefault();
	const form = event.target;
	const newArtist = getArtistDataFromInput(form);
	const response = await addArtist(newArtist);
	if(response.ok){
		displayArtists(artists);
		scrollToTop();
		showToastMessage("Artist added successfully!" ,"success");
		form.reset();
		form.parentElement.close();
	}
}

export async function submitFavoriteArtist(artist){
	const response = await addToFavorites(artist);
	if (response.ok){
		displayFavorites(favoriteArtists);
		scrollToTop();
		showToastMessage(`${artist.name} added to favorites!`, "success");
	}
}

/* ========== UPDATE ========== */

// Function to handle the submission of artist updates //
export async function submitArtistUpdate(event){
	event.preventDefault();
	const form = event.target;
	const updatedArtist = getArtistDataFromInput(form);
	const response = await updateArtist(updatedArtist);
	if(response.ok){
		displayArtists(artists);
		scrollToTop();
		showToastMessage(`${selectedArtist.name} updated successfully!`,"success");
		form.reset();
		form.parentElement.close();
	}
}

/* ========== DELETE ========== */

// delete artist button clicked //
export async function submitArtistDelete(artist){
	const response = await deleteArtist(artist);
	if(response.ok){
		displayArtists(artists);
		showToastMessage( `${artist.name} deleted successfully!`, "success");
	}
}

//remove artist from favorites //
export async function submitRemoveFromFavorites(artist){
	const response = await removeFromFavorites(artist);
	if(response.ok){
		displayFavorites(favoriteArtists);
		showToastMessage(`${artist.name} removed from favorites`, "success");
	}
}

// Helper function to extract artist data from form input fields //
function getArtistDataFromInput(form){
	return {
		name: form.name.value,
		birthdate: form.birthdate.value,
		activeSince: form.activeSince.value,
		genres: form.genres.value.split(",").map(genre => genre.trim()),
		labels: form.labels.value.split(",").map(genre => genre.trim()),
		roles: form.roles.value.split(",").map(genre => genre.trim()),
		website: form.website.value,
		image: form.image.value,
		shortDescription: form.shortDescription.value
	}
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