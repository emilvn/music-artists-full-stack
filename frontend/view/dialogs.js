/* ========== CREATE DIALOG ========== */
// Function to display the create artist dialog. //
import {
	addDetailDialogEventListeners,
	setFormEventListeners,
	submitArtistCreate,
	submitArtistDelete,
	submitArtistUpdate
} from "../controller/controller.js";
import {favoriteArtists} from "../model/model.js";
import {formatDate, generateListFromArray} from "./view.js";

export function showCreateDialog() {
	const form = document.querySelector("#form-create");
	setFormEventListeners(form, submitArtistCreate);
	form.parentElement.showModal();
}

/* ========== UPDATE DIALOG ========== */

// Function to display the update artist dialog. //
export function showUpdateDialog() {
	const form = document.querySelector("#form-update");
	setFormEventListeners(form, submitArtistUpdate);
	form.parentElement.showModal();
}

export function showDeleteDialog() {
	const form = document.querySelector("#form-delete");
	setFormEventListeners(form, submitArtistDelete);
	form.parentElement.showModal();
}

/* ========== DETAIL DIALOG ========== */

// Function to display the artist details in a dialog. //
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

	// Generate lists for genres, roles, and labels. //
	generateListFromArray(artist.genres, dialog.querySelector("#detail-artist__genres"));
	generateListFromArray(artist.roles, dialog.querySelector("#detail-artist__roles"));
	generateListFromArray(artist.labels, dialog.querySelector("#detail-artist__labels"));

	setDetailFavoriteButtonIcon(artist);

	addDetailDialogEventListeners(artist);
	dialog.showModal();
}

// function for clearing detail dialog info before showing new artist //
function clearDetailDialog() {
	document.querySelectorAll(".artist-detail").forEach(detail => {
		if (detail.tagName !== "A") detail.innerHTML = "";
	});
}

export function setDetailFavoriteButtonIcon(artist) {
	const favoriteButton = document.querySelector("#artist-detail-dialog .favorite-button");
	favoriteButton.innerHTML =
		(favoriteArtists.find(favorite => favorite.id === artist.id))
			? "<img src=\"icons/remove-favorite-icon.png\" alt=\"Remove from favorites\">"
			: "<img src=\"icons/add-favorite-icon.png\" alt=\"Add to favorites\">";
}