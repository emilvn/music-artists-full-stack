/* ========== IMPORTS ========== */
import {addArtist, updateArtist} from "./requests.js";

/* ========== CREATE ========== */

// Function to handle the submission of a new artist //

export function submitArtistCreate(event){
	event.preventDefault();
	const form = event.target;
	const newArtist = getArtistDataFromInput(form);
	addArtist(newArtist);
	form.reset();
	form.parentElement.close();
}

/* ========== UPDATE ========== */

// Function to handle the submission of artist updates //
export function submitArtistUpdate(event){
	event.preventDefault();
	const form = event.target;
	const updatedArtist = getArtistDataFromInput(form);
	updateArtist(updatedArtist);
	form.reset();
	form.parentElement.close();
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