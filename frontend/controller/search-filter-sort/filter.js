/* ========== FILTER ========== */
// Filter artists //
import {artists, filterArtists, getArtists} from "../../model/artists.js";
import {displayArtists, displayFavorites} from "../../view/view.js";
import {favoriteArtists, filterFavorites, getFavorites} from "../../model/favorites.js";

// function to filter the artists when a filter option is selected //
export async function filterArtistsChanged() {
	const selectElement = document.querySelector("#artist-filter-by__genre");
	await getArtists();
	await getFavorites();
	if (selectElement.value !== "") {
		filterArtists(selectElement.value);
		filterFavorites(selectElement.value);
	}
	displayArtists(artists);
	displayFavorites(favoriteArtists);
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

// function to show the filter menu when filter button is clicked //
export function showFilterMenu() {
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.removeEventListener("click", showFilterMenu);
	filterButton.addEventListener("click", hideFilterMenu);
	filterButton.classList.add("button-inset");
	const filterMenu = document.querySelector("#filter-sort");
	filterMenu.classList.remove("hidden");
}

// function to hide the filter menu when filter button is clicked //
function hideFilterMenu() {
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.removeEventListener("click", hideFilterMenu);
	filterButton.addEventListener("click", showFilterMenu);
	filterButton.classList.remove("button-inset");
	const filterMenu = document.querySelector("#filter-sort");
	filterMenu.classList.add("hidden");
}