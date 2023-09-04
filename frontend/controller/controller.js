/* ========== IMPORTS ========== */
import {getSpecificArtist} from "../model/artists.js";
import {showCreateDialog, showDeleteDialog, showDetailDialog} from "../view/dialogs.js";
import {filterArtists, showFilterMenu} from "./filter.js";
import {addToolTip} from "../view/helpers/tooltip.js";
import {sortAlphabetically, sortReverseAlphabetically} from "./sort.js";
import {favoriteArtists} from "../model/favorites.js";
import {removeSubmitEvent, submitFavoriteArtist, submitRemoveFromFavorites} from "./submit.js";
import {inputSearchChanged} from "./search.js";
import {selectArtist} from "./selectartist.js";

/* ========== EVENT LISTENERS ========== */
// set event listeners for buttons and search/sort //
export function setInitialEventListeners(){
	// add artist button //
	const addArtistButton = document.querySelector("#add-artist-dialog-button");
	addArtistButton.addEventListener("click", showCreateDialog);

	// search bar //
	const searchBar = document.querySelector("#artist-search");
	searchBar.addEventListener("search", inputSearchChanged);
	searchBar.addEventListener("keyup", inputSearchChanged);
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.addEventListener("click", showFilterMenu);

	// sort buttons //
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

// event listeners for detail dialog //
export function setDetailDialogEventListeners(artist){
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
export function setTooltips(){
	const tooltip = document.querySelector("#detail-tooltip");
	const addArtistButton = document.querySelector("#add-artist-dialog-button");
	const filterButton = document.querySelector("#filter-sort-button");
	addToolTip(tooltip, addArtistButton, "Add new artist", false);
	addToolTip(tooltip, filterButton, "Show filter options", false);

}

export function setArtistTooltips(artistArticle, artist, containerID) {
	const tooltip = document.querySelector("#detail-tooltip");
	const editButton = artistArticle.querySelector(".edit-button");
	const deleteButton = artistArticle.querySelector(".delete-button");
	const favoriteButton = artistArticle.querySelector(".favorite-button");
	const websiteButton = artistArticle.querySelector(".website-button");
	addToolTip(tooltip, artistArticle, "Show more details", false);
	addToolTip(tooltip, editButton, "Edit artist details", true);
	addToolTip(tooltip, deleteButton, "Delete artist", true);
	addToolTip(tooltip, favoriteButton, (containerID === "#favorites") ? "Remove from favorites" : "Add to favorites", true);
	addToolTip(tooltip, websiteButton, artist.website.replace(/https?:\/\/www\./, ""), true);
}
export function setDetailDialogTooltips(){
	const tooltip = document.querySelector("#detail-dialog__tooltip");
	const websiteButton = document.querySelector("#artist-detail-dialog .website-button");
	const favoriteButton = document.querySelector("#artist-detail-dialog .favorite-button");
	const editButton = document.querySelector("#artist-detail-dialog .edit-button");
	const deleteButton = document.querySelector("#artist-detail-dialog .delete-button");
	const artistURLShortForm = websiteButton.querySelector("a")
		.href.replace(/https?:\/\/www\./, "");
	const favoriteButtonText = favoriteButton.querySelector("img")
		.alt;
	addToolTip(tooltip, websiteButton, artistURLShortForm, false);
	addToolTip(tooltip, favoriteButton, favoriteButtonText, false);
	addToolTip(tooltip, editButton, "Edit artist details", false);
	addToolTip(tooltip, deleteButton, "Delete artist", false);
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