/* ========== IMPORTS ========== */
import {artists, getSpecificArtist} from "../model/artists.js";
import {displayArtists, displayFavorites} from "../view/view.js";
import {showCreateDialog, showDeleteDialog, showDetailDialog, showUpdateDialog} from "../view/dialogs.js";
import {filterArtists, showFilterMenu} from "./filter.js";
import {addToolTip} from "../view/helpers/tooltip.js";
import {sortAlphabetically, sortReverseAlphabetically} from "./sort.js";
import {favoriteArtists} from "../model/favorites.js";
import {removeSubmitEvent, submitFavoriteArtist, submitRemoveFromFavorites} from "./submit.js";

export let selectedArtist;

/* ========== EVENT LISTENERS ========== */

// set event listeners for buttons and search/sort //
export function setEventListeners(){
	// add artist button //
	const addArtistButton = document.querySelector("#add-artist-dialog-button");
	addArtistButton.addEventListener("click", showCreateDialog);
	addToolTip(addArtistButton, "Add new artist", false);

	// search bar //
	const searchBar = document.querySelector("#artist-search");
	searchBar.addEventListener("search", inputSearchChanged);
	searchBar.addEventListener("keyup", inputSearchChanged);
	const filterButton = document.querySelector("#filter-sort-button");
	addToolTip(filterButton, "Show filter options", false);
	filterButton.addEventListener("click", showFilterMenu);

	// sort buttons //
	sortAlphabetically();
	document.querySelector("#alphabetical-sort").addEventListener("click", sortAlphabetically);
	document.querySelector("#reverse-alphabetical-sort").addEventListener("click", sortReverseAlphabetically);

	document.querySelector("#artist-filter-by__genre")
		.addEventListener("change", filterArtists);
}

// sets event listeners for artist articles //
export function setArtistEventListeners(artistArticle, artist, containerID){
	// edit, delete, website and favorite buttons. //
	artistArticle.querySelector(".edit-button")
		.addEventListener("click", (e)=> {
			e.stopPropagation();
			selectArtist(artist);
		});
	artistArticle.querySelector(".delete-button")
		.addEventListener("click", (e)=> {
			e.stopPropagation();
			document.querySelector("#form-delete").dataset.id = artist.id;
			document.querySelector("#name-delete").textContent = artist.name;
			showDeleteDialog();
		});
	artistArticle.querySelector(".favorite-button")
		.addEventListener("click", (e)=> {
			e.stopPropagation();
			(containerID === "#favorites") ? submitRemoveFromFavorites(artist) : submitFavoriteArtist(artist);
		});
	artistArticle.querySelector(".website-button")
		.addEventListener("click", (e) => {
			e.stopPropagation();
		})

	// display artist details when article clicked. //
	artistArticle.addEventListener("click", async ()=> {
		const response = await getSpecificArtist(artist);
		if(response.ok){
			const artistToShow = await response.json();
			showDetailDialog(artistToShow);
		}
	});
}

// event listeners for forms //
export function setFormEventListeners(form, submitFunction){
	form.addEventListener("submit", submitFunction);
	form.parentElement
		.addEventListener("close", ()=> removeSubmitEvent(form, submitFunction));
	form.parentElement.querySelector(".dialog-close-button")
		.addEventListener("click", () => form.parentElement.close());
}

// Helper function to extract artist data from form input fields //
export function getArtistDataFromInput(form){
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

// Selects an artist and populates the update form with artist details. //
export function selectArtist(artist){
	selectedArtist = artist;
	const form = document.querySelector("#form-update");
	form.name.value = artist.name;
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

export function addDetailDialogEventListeners(artist){
	const dialog = document.querySelector("#artist-detail-dialog");
	dialog.querySelector(".favorite-button")
		.addEventListener("click", submitFavoriteLocal);

	dialog.querySelector(".edit-button")
		.addEventListener("click", selectArtistLocal);

	dialog.querySelector(".delete-button")
		.addEventListener("click", submitDeleteLocal);

	// detail dialog close button event listener //
	document.querySelector("#detail-dialog__close-button")
		.addEventListener("click", () => {
			dialog.querySelector(".favorite-button")
				.removeEventListener("click", submitFavoriteLocal);
			dialog.querySelector(".edit-button")
				.removeEventListener("click", selectArtistLocal);
			dialog.querySelector(".delete-button")
				.removeEventListener("click", submitDeleteLocal);
			dialog.close();
		});
	async function submitFavoriteLocal(){
		if(favoriteArtists.find(favorite => favorite.id === artist.id)){
			submitRemoveFromFavorites(artist);
		}
		else await submitFavoriteArtist(artist);
	}
	function selectArtistLocal(){
		selectArtist(artist);
	}
	function submitDeleteLocal(){
		document.querySelector("#form-delete").dataset.id = artist.id;
		document.querySelector("#name-delete").textContent = artist.name;
		showDeleteDialog();
	}
}

/* ========== SEARCH ========== */
// Function to handle input change for artist search bar. //
function inputSearchChanged(event){
	const searchValue = event.target.value;
	const filteredFavorites = favoriteArtists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	displayFavorites(filteredFavorites);
	displayArtists(filteredArtists);
}