import {getSpecificArtist} from "../model/artists.js";
import {showCreateDialog, showDeleteDialog, showDetailDialog} from "../view/dialogs.js";
import {filterArtistsChanged, showFilterMenu} from "./search-filter-sort/filter.js";
import {sortAlphabetically, sortReverseAlphabetically} from "./search-filter-sort/sort.js";
import {favoriteArtists} from "../model/favorites.js";
import {removeSubmitEvent, submitFavoriteArtist, submitRemoveFromFavorites} from "./submit.js";
import {inputSearchChanged} from "./search-filter-sort/search.js";
import {selectArtist} from "./helpers/selectartist.js";

/**
 * setInitialEventListeners
 * Sets the initial event listeners on page load
 */
export function setInitialEventListeners(){
	// add artist button
	const addArtistButton = document.querySelector("#add-artist-dialog-button");
	addArtistButton.addEventListener("click", showCreateDialog);

	// search bar
	const searchBar = document.querySelector("#artist-search");
	searchBar.addEventListener("search", inputSearchChanged);
	searchBar.addEventListener("keyup", inputSearchChanged);
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.addEventListener("click", showFilterMenu);

	// sort buttons
	document.querySelector("#alphabetical-sort").addEventListener("click", sortAlphabetically);
	document.querySelector("#reverse-alphabetical-sort").addEventListener("click", sortReverseAlphabetically);

	document.querySelector("#artist-filter-by__genre")
		.addEventListener("change", filterArtistsChanged);
}

/**
 * setArtistEventListeners
 * sets event listeners for click events regarding each artist article
 * @param {HTMLElement} artistArticle article element displaying artist info
 * @param {Artist} artist artist object containing artist details
 * @param {string} containerID the identifier of the container the article is in(#favorites/#artists)
 */
export function setArtistEventListeners(artistArticle, artist, containerID){
	// edit button
	artistArticle.querySelector(".edit-button")
		.addEventListener("click", (e)=> {
			e.stopPropagation();
			selectArtist(artist);
		});

	// delete button
	artistArticle.querySelector(".delete-button")
		.addEventListener("click", (e)=> {
			e.stopPropagation();
			document.querySelector("#form-delete").dataset.id = artist.id;
			document.querySelector("#name-delete").textContent = artist.name;
			showDeleteDialog();
		});

	// favorite button
	artistArticle.querySelector(".favorite-button")
		.addEventListener("click", (e)=> {
			e.stopPropagation();
			(containerID === "#favorites") ? submitRemoveFromFavorites(artist) : submitFavoriteArtist(artist);
		});

	// website button
	artistArticle.querySelector(".website-button")
		.addEventListener("click", (e) => {
			e.stopPropagation();
		})

	// display artist details when article clicked
	artistArticle.addEventListener("click", async ()=> {
		const response = await getSpecificArtist(artist);
		if(response.ok){
			const artistToShow = await response.json();
			showDetailDialog(artistToShow);
		}
	});
}

/**
 * setFormEventListeners
 * sets the relevant submit and close event listeners for forms
 * @param {HTMLFormElement} form form to add event listeners to
 * @param {function} submitFunction callback function for event listeners to add/remove
 */
export function setFormEventListeners(form, submitFunction){
	form.addEventListener("submit", submitFunction);
	form.parentElement
		.addEventListener("close", ()=> removeSubmitEvent(form, submitFunction));
	form.parentElement.querySelector(".dialog-close-button")
		.addEventListener("click", () => form.parentElement.close());
}

/**
 * setDetailDialogEventListeners
 * sets the relevant event listeners for the detail dialog buttons and close
 * @param {Artist} artist artist object containing artist details to be displayed
 */
export function setDetailDialogEventListeners(artist){
	const dialog = document.querySelector("#artist-detail-dialog");

	// favorite button
	dialog.querySelector(".favorite-button")
		.addEventListener("click", submitFavoriteLocal);

	// edit button
	dialog.querySelector(".edit-button")
		.addEventListener("click", selectArtistLocal);

	//delete button
	dialog.querySelector(".delete-button")
		.addEventListener("click", submitDeleteLocal);

	// close button
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

	// using closure to make removable callbacks for event listeners
	async function submitFavoriteLocal(){
		if(favoriteArtists.find(favorite => favorite.id === artist.id)){
			submitRemoveFromFavorites(artist);
		}
		else await submitFavoriteArtist(artist);
	}
	// using closure to make removable callbacks for event listeners
	function selectArtistLocal(){
		selectArtist(artist);
	}
	// using closure to make removable callbacks for event listeners
	function submitDeleteLocal(){
		document.querySelector("#form-delete").dataset.id = artist.id;
		document.querySelector("#name-delete").textContent = artist.name;
		showDeleteDialog();
	}
}

