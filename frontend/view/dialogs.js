import {
	setDetailDialogEventListeners, setFormEventListeners
} from "../controller/seteventlisteners.js";
import {generateListFromArray} from "./view.js";
import {formatDate} from "./helpers/formatting.js";
import {favoriteArtists} from "../model/favorites.js";
import {submitArtistCreate, submitArtistDelete, submitArtistUpdate} from "../controller/submit.js";
import {setDetailDialogTooltips} from "../controller/settooltips.js";

/**
 * function for showing the dialog with the create form
 */
export function showCreateDialog() {
	const form = document.querySelector("#form-create");
	setFormEventListeners(form, submitArtistCreate);
	form.parentElement.showModal();
}

/**
 * function for showing the dialog with the update form
 */
export function showUpdateDialog() {
	const form = document.querySelector("#form-update");
	setFormEventListeners(form, submitArtistUpdate);
	form.parentElement.showModal();
}

/**
 * function for showing the delete confirmation form
 */
export function showDeleteDialog() {
	const form = document.querySelector("#form-delete");
	setFormEventListeners(form, submitArtistDelete);
	form.parentElement.showModal();
}

/**
 * function for filling in and displaying the detail dialog
 * @param {Artist} artist artist object with details to be displayed
 */
export function showDetailDialog(artist) {
	const dialog = document.querySelector("#artist-detail-dialog");
	clearDetailDialog();
	// Populate the dialog with artist details. //
	dialog.querySelector("#detail-artist__name")
		.textContent = artist.name;
	dialog.querySelector("#detail-artist__image")
		.src = artist.image;
	dialog.querySelector("#detail-artist__short-description")
		.textContent = artist.shortDescription;
	dialog.querySelector("#detail-artist__date-of-birth")
		.textContent = formatDate(artist.birthdate);
	dialog.querySelector("#detail-artist__active-since")
		.textContent = formatDate(artist.activeSince);
	dialog.querySelector("#detail-artist__website")
		.href = artist.website;

	// Generate lists for genres, roles, and labels.
	generateListFromArray(artist.genres, dialog.querySelector("#detail-artist__genres"));
	generateListFromArray(artist.roles, dialog.querySelector("#detail-artist__roles"));
	generateListFromArray(artist.labels, dialog.querySelector("#detail-artist__labels"));

	// set add to/remove from favorites icon on favorite button
	setDetailFavoriteButtonIcon(artist);

	setDetailDialogEventListeners(artist);
	setDetailDialogTooltips();
	dialog.showModal();
}

/**
 * function for clearing the details from the detail dialog
 */
function clearDetailDialog() {
	document.querySelectorAll(".artist-detail").forEach(detail => {
		if (detail.tagName !== "A") detail.innerHTML = "";
	});
}

/**
 * function for setting the icon of the favorite button (add to / remove from favorites icon)
 * @param {Artist} artist artist the button is for
 */
export function setDetailFavoriteButtonIcon(artist) {
	const favoriteButton = document.querySelector("#artist-detail-dialog .favorite-button");
	favoriteButton.innerHTML =
		(favoriteArtists.find(favorite => favorite.id === artist.id))
			? "<img src=\"icons/remove-favorite-icon.png\" alt=\"Remove from favorites\">"
			: "<img src=\"icons/add-favorite-icon.png\" alt=\"Add to favorites\">";
}