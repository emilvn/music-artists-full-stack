/* ========== FILTER ========== */
// Filter artists //
import {artists} from "../model/artists.js";
import {displayArtists, displayFavorites} from "../view/view.js";
import {favoriteArtists} from "../model/favorites.js";

export function filterArtists() {
	const selectElement = document.querySelector("#artist-filter-by__genre");
	if (selectElement.value === "") {
		displayArtists(artists);
		displayFavorites(favoriteArtists);
	} else {
		const filteredArtists = artists.filter(artist => artist.genres.includes(selectElement.value));
		const filteredFavorites = favoriteArtists.filter(artist => artist.genres.includes(selectElement.value));
		displayArtists(filteredArtists);
		displayFavorites(filteredFavorites);
	}
}

// Generate options for genrefilter //
export function generateFilterOptions() {
	const selectElement = document.querySelector("#artist-filter-by__genre");
	selectElement.innerHTML = "";
	const genres = new Set();
	const noneOption = document.createElement("option");
	noneOption.value = "";
	noneOption.textContent = "All";
	selectElement.insertAdjacentElement("beforeend", noneOption);
	for (const artist of artists) {
		for (const genre of artist.genres) {
			genres.add(genre.toLowerCase());
		}
	}
	for (const genre of genres) {
		const option = document.createElement("option");
		option.value = genre;
		option.textContent = genre;
		selectElement.insertAdjacentElement("beforeend", option);
	}
}

export function showFilterMenu() {
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.removeEventListener("click", showFilterMenu);
	filterButton.addEventListener("click", hideFilterMenu);
	filterButton.classList.add("button-inset");
	const filterMenu = document.querySelector("#filter-sort");
	filterMenu.classList.remove("hidden");
}

function hideFilterMenu() {
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.removeEventListener("click", hideFilterMenu);
	filterButton.addEventListener("click", showFilterMenu);
	filterButton.classList.remove("button-inset");
	const filterMenu = document.querySelector("#filter-sort");
	filterMenu.classList.add("hidden");
}