import {showUpdateDialog} from "../../view/dialogs.js";
/**
 * The artist currently selected for updating
 * @type {Artist | null}
 */
export let selectedArtist;

/**
 * Selects an artist and fills in update form inputs with artist data
 * @param {Artist} artist artist object containing artist data
 */
export function selectArtist(artist) {
	selectedArtist = artist;
	const form = document.querySelector("#form-update");
	form.artistName.value = artist.name;
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