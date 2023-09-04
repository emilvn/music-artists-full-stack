/* ========== SORT ========== */
// Function to handle input change for sorting select. //
import {artists, favoriteArtists} from "../model/model.js";
import {displayArtists, displayFavorites} from "../view/view.js";

export function sortAlphabetically() {
	const sortAlphabeticallyButton = document.querySelector("#alphabetical-sort");
	const sortReverseButton = document.querySelector("#reverse-alphabetical-sort");
	sortAlphabeticallyButton.classList.add("button-inset");
	sortReverseButton.classList.remove("button-inset");

	artists.sort((a, b) => a.name.localeCompare(b.name));
	favoriteArtists.sort((a, b) => a.name.localeCompare(b.name));
	displayArtists(artists);
	displayFavorites(favoriteArtists);
}

export function sortReverseAlphabetically() {
	const sortReverseButton = document.querySelector("#reverse-alphabetical-sort");
	const sortAlphabeticallyButton = document.querySelector("#alphabetical-sort");
	sortReverseButton.classList.add("button-inset");
	sortAlphabeticallyButton.classList.remove("button-inset");

	artists.sort((a, b) => b.name.localeCompare(a.name));
	favoriteArtists.sort((a, b) => b.name.localeCompare(a.name));
	displayArtists(artists);
	displayFavorites(favoriteArtists);
}