// function to remove submit events from forms. //
import {addArtist, artists, deleteArtist, updateArtist} from "../model/artists.js";
import {displayArtists, displayFavorites} from "../view/view.js";
import {addToFavorites, favoriteArtists, removeFromFavorites} from "../model/favorites.js";
import {showToastMessage} from "../view/helpers/toastmessages.js";
import {setDetailFavoriteButtonIcon} from "../view/dialogs.js";
import {getArtistDataFromInput} from "./controller.js";
import {selectedArtist} from "./selectartist.js";

export function removeSubmitEvent(form, functionToRemove) {
	form.reset();
	form.removeEventListener("submit", functionToRemove);
}

/* ========== CREATE ========== */
// Function to handle the submission of a new artist //
export async function submitArtistCreate(event) {
	event.preventDefault();
	const form = event.target;
	const newArtist = getArtistDataFromInput(form);
	try {
		const response = await addArtist(newArtist);
		if (response.ok) {
			displayArtists(artists);
			showToastMessage("Artist added successfully!", "success");
			form.reset();
			form.parentElement.close();
		}
	} catch (err) {
		showToastMessage(`Oops, something went wrong.`, "error");
		console.error(err);
	}
}
// add to favorites clicked //
export async function submitFavoriteArtist(artist) {
	try {
		const response = await addToFavorites(artist);
		if (response.ok) {
			displayFavorites(favoriteArtists);
			showToastMessage(`${artist.name} added to favorites!`, "success");
			setDetailFavoriteButtonIcon(artist);
		}
	} catch (err) {
		showToastMessage(`Oops, something went wrong.`, "error");
		console.error(err);
	}
}

/* ========== UPDATE ========== */
// Function to handle the submission of artist updates //
export async function submitArtistUpdate(event) {
	event.preventDefault();
	const form = event.target;
	const updatedArtist = getArtistDataFromInput(form);
	try {
		const response = await updateArtist(updatedArtist);
		if (response.ok) {
			displayArtists(artists);
			showToastMessage(`${selectedArtist.name} updated successfully!`, "success");
			form.reset();
			form.parentElement.close();
			document.querySelector("#artist-detail-dialog").close();
		}
	} catch (err) {
		showToastMessage("Oops, something went wrong", "error");
		console.error(err);
	}
}
/* ========== DELETE ========== */
// delete artist button clicked //
export async function submitArtistDelete(event) {
	event.preventDefault();
	const form = event.target;
	const artist = artists.find(artist => artist.id === form.dataset.id);
	try {
		const response = await deleteArtist(artist);
		if (response.ok) {
			displayArtists(artists);
			// if deleted artist in favorites, remove from favorites //
			if (favoriteArtists.find(favorite => favorite.id === artist.id)) {
				submitRemoveFromFavorites(artist);
			}
			showToastMessage(`${artist.name} deleted successfully!`, "success");
			form.parentElement.close();
			document.querySelector("#artist-detail-dialog").close();
		}
	} catch (err) {
		showToastMessage("Oops something went wrong.", "error");
		console.error(err);
	}
}

//remove from favorites clicked //
export async function submitRemoveFromFavorites(artist) {
	try {
		const response = await removeFromFavorites(artist);
		if (response.ok) {
			displayFavorites(favoriteArtists);
			showToastMessage(`${artist.name} removed from favorites`, "success");
			setDetailFavoriteButtonIcon(artist);
		}
	} catch (err) {
		showToastMessage("Oops, something went wrong.", "error");
		console.error(err);
	}
}