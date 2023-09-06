import {addArtist, artists, deleteArtist, updateArtist} from "../model/artists.js";
import {displayArtists, displayFavorites} from "../view/view.js";
import {addToFavorites, favoriteArtists, getFavorites, removeFromFavorites} from "../model/favorites.js";
import {showToastMessage} from "../view/helpers/toastmessages.js";
import {setDetailFavoriteButtonIcon} from "../view/dialogs.js";
import {selectedArtist} from "./helpers/selectartist.js";
import {getArtistDataFromInput} from "./helpers/getdatafrominput.js";

/**
 * removeSubmitEvent
 * function to remove a submit event from a form
 * @param {HTMLFormElement} form form to remove submit event from
 * @param {function} functionToRemove callback function to remove
 */
export function removeSubmitEvent(form, functionToRemove) {
	form.reset();
	form.removeEventListener("submit", functionToRemove);
}

/**
 * submitArtistCreate
 * function to submit new artist details on form submit, and update the display
 * @param {SubmitEvent} event submit event object from the create artist form
 */
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
		showToastMessage(err.message|"Failed to create artist", "error");
		console.error(err);
	}
}

/**
 * submitFavoriteArtist
 * function to add an artist to favorites on favorite button click
 * @param {Artist} artist artist object to add to favorites
 */
export async function submitFavoriteArtist(artist) {
	try {
		const response = await addToFavorites(artist);
		if (response.ok) {
			displayFavorites(favoriteArtists);
			showToastMessage(`${artist.name} added to favorites!`, "success");
			setDetailFavoriteButtonIcon(artist);
			document.querySelector("#artist-detail-dialog").close();
		}
	} catch (err) {
		showToastMessage(err.message |"Failed to add artist to favorites", "error");
		console.error(err);
	}
}

/**
 * submitArtistUpdate
 * function to submit update artist details on form submit, and update the display
 * @param {SubmitEvent} event submit event object from the update artist form
 */
export async function submitArtistUpdate(event) {
	event.preventDefault();
	const form = event.target;
	const updatedArtist = getArtistDataFromInput(form);
	try {
		const response = await updateArtist(updatedArtist);
		if (response.ok) {
			await getFavorites();
			displayArtists(artists);
			displayFavorites(favoriteArtists);
			showToastMessage(`${selectedArtist.name} updated successfully!`, "success");
			form.reset();
			form.parentElement.close();
			document.querySelector("#artist-detail-dialog").close();
		}
	} catch (err) {
		showToastMessage(err.message|"Failed to update artist", "error");
		console.error(err);
	}
}

/**
 * submitArtistDelete
 * function to delete artist on form submit, and update the display
 * @param {SubmitEvent} event submit event object from the delete artist form
 */
export async function submitArtistDelete(event) {
	event.preventDefault();
	const form = event.target;
	const artist = artists.find(artist => artist.id === form.dataset.id);
	try {
		const response = await deleteArtist(artist);
		if (response.ok) {
			displayArtists(artists);
			if (favoriteArtists.find(favorite => favorite.id === artist.id)) { // also remove from favorites
				await submitRemoveFromFavorites(artist);
			}
			showToastMessage(`${artist.name} deleted successfully!`, "success");
			form.parentElement.close();
			document.querySelector("#artist-detail-dialog").close();
		}
	} catch (err) {
		showToastMessage(err.message|"Failed to delete artist", "error");
		console.error(err);
	}
}

/**
 * submitRemoveFromFavorites
 * function to remove artist from favorites, and update the display
 * @param {Artist} artist artist object to remove from favorites
 */
export async function submitRemoveFromFavorites(artist) {
	try {
		const response = await removeFromFavorites(artist);
		if (response.ok) {
			displayFavorites(favoriteArtists);
			showToastMessage(`${artist.name} removed from favorites`, "success");
			setDetailFavoriteButtonIcon(artist);
			document.querySelector("#artist-detail-dialog").close();
		}
	} catch (err) {
		showToastMessage(err.message|"Failed to remove artist from favorites", "error");
		console.error(err);
	}
}