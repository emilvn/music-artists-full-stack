import {artists} from "../../model/artists.js";
import {displayArtists, displayFavorites} from "../../view/view.js";
import {favoriteArtists} from "../../model/favorites.js";

/**
 * sortAlphabetically
 * sorts the cached arrays of artists and favorites alphabetically and updates the view
 */
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

/**
 * sortReverseAlphabetically
 * sorts the cached arrays of artists and favorites in reverse alphabetical order and updates the view
 */
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