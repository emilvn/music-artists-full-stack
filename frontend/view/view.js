/* ========== IMPORTS ========== */
import {
	addDetailDialogEventListeners,
	removeSubmitEvent, setArtistEventListeners, setFormEventListeners,
	submitArtistCreate, submitArtistDelete,
	submitArtistUpdate,
} from "../controller/controller.js";
import { artists, favoriteArtists} from "../model/model.js";

/* ========== DISPLAY ARTISTS ========== */

// Function to display a list of artists. //
export function displayArtists(artists){
	document.querySelector("#artists").innerHTML = "";
	for(const artist of artists){
		displayArtist(artist, "#artists");
	}
}
/* ========== DISPLAY FAVORITES ========== */

// Function to display a list of favorite artists. //
export function displayFavorites(favorites){
	document.querySelector("#favorites").innerHTML = "";
	for(const artist of favorites){
		displayArtist(artist, "#favorites");
	}
}

// Function to display a single artist. //
function displayArtist(artist, containerID){
	const container = document.querySelector(containerID);
	const myHTML = /*html*/`
		<article>
            <div class="artist-info">
                <h3>${artist.name}</h3>
                <p>${artist.shortDescription}</p>
                <p>Date of birth: ${formatDate(artist.birthdate)}</p>
            </div>
			<div class="artist-buttons">
                <button class="website-button">
                	<a href="${artist.website}"><img src="icons/website-icon.png" alt="Website"></a>
				</button>
				<button class="favorite-button">${(containerID === "#favorites")?"<img src=\"icons/remove-favorite-icon.png\" alt=\"Remove from favorites\">":"<img src=\"icons/add-favorite-icon.png\" alt=\"Add to favorites\">"}</button>
				<button class="edit-button"><img src="icons/edit-icon.png" alt="Edit"></button>
				<button class="delete-button"><img src="icons/delete-icon.png" alt="Delete"></button>
			</div>
        </article>
	`;
	container.insertAdjacentHTML("beforeend", myHTML);
	const artistArticle = container.querySelector("article:last-child");
	artistArticle.style.backgroundImage = `url(${artist.image})`;
	setArtistEventListeners(artistArticle, artist, containerID);
	addArtistTooltips(artistArticle, artist, containerID);
}

function addArtistTooltips(artistArticle, artist, containerID){
	const editButton = artistArticle.querySelector(".edit-button");
	const deleteButton = artistArticle.querySelector(".delete-button");
	const favouriteButton = artistArticle.querySelector(".favorite-button");
	const websiteButton = artistArticle.querySelector(".website-button");
	addToolTip(artistArticle, "Show more details", false);
	addToolTip(editButton, "Edit artist details", true);
	addToolTip(deleteButton, "Delete artist", true);
	addToolTip(favouriteButton, (containerID === "#favorites")?"Remove from favourites":"Add to favourites", true);
	addToolTip(websiteButton, artist.website.replace(/https?:\/\/www\./, ""), true);
}

/* ========== CREATE DIALOG ========== */
// Function to display the create artist dialog. //
export function showCreateDialog(){
	const form = document.querySelector("#form-create");
	setFormEventListeners(form, submitArtistCreate);
	form.parentElement.showModal();
}

/* ========== UPDATE DIALOG ========== */
// Function to display the update artist dialog. //
export function showUpdateDialog(){
	const form = document.querySelector("#form-update");
	setFormEventListeners(form, submitArtistUpdate);
	form.parentElement.showModal();
}

export function showDeleteDialog(){
	const form = document.querySelector("#form-delete");
	setFormEventListeners(form, submitArtistDelete);
	form.parentElement.showModal();
}

/* ========== DETAIL DIALOG ========== */
// Function to display the artist details in a dialog. //
export function showDetailDialog(artist){
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

	const favoriteButton = dialog.querySelector(".favorite-button");
	favoriteButton.innerHTML =
	(favoriteArtists.find(favorite => favorite.id === artist.id))
		? "<img src=\"icons/remove-favorite-icon.png\" alt=\"Remove from favorites\">"
		:"<img src=\"icons/add-favorite-icon.png\" alt=\"Add to favorites\">";

	// Generate lists for genres, roles, and labels. //
	generateListFromArray(artist.genres, dialog.querySelector("#detail-artist__genres"));
	generateListFromArray(artist.roles, dialog.querySelector("#detail-artist__roles"));
	generateListFromArray(artist.labels, dialog.querySelector("#detail-artist__labels"));

	addDetailDialogEventListeners(artist);
	dialog.showModal();
}

// function for clearing detail dialog info before showing new artist //
function clearDetailDialog(){
	document.querySelectorAll(".artist-detail").forEach(detail => {
		if(detail.tagName !== "A") detail.innerHTML = "";
	});
}

// function for generating and inserting html list elements from an array into a container //
function generateListFromArray(arr, container){
	for(const item of arr){
		container.insertAdjacentHTML("beforeend", `<li>${item}</li>`);
	}
}

/* ========== SEARCH ========== */
// Function to handle input change for artist search bar. //
export function inputSearchChanged(event){
	const searchValue = event.target.value;
	const filteredFavorites = favoriteArtists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	displayFavorites(filteredFavorites);
	displayArtists(filteredArtists);
}

/* ========== SORT ========== */
// Function to handle input change for sorting select. //
export function sortAlphabetically(event){
	const sortAlphabeticallyButton = document.querySelector("#alphabetical-sort");
	const sortReverseButton = document.querySelector("#reverse-alphabetical-sort");
	sortAlphabeticallyButton.classList.add("button-inset");
	sortReverseButton.classList.remove("button-inset");

	artists.sort((a,b) => a.name.localeCompare(b.name));
	favoriteArtists.sort((a,b) => a.name.localeCompare(b.name));
	displayArtists(artists);
	displayFavorites(favoriteArtists);
}
export function sortReverseAlphabetically(event){
	const sortReverseButton = document.querySelector("#reverse-alphabetical-sort");
	const sortAlphabeticallyButton = document.querySelector("#alphabetical-sort");
	sortReverseButton.classList.add("button-inset");
	sortAlphabeticallyButton.classList.remove("button-inset");

	artists.sort((a,b) => b.name.localeCompare(a.name));
	favoriteArtists.sort((a,b) => b.name.localeCompare(a.name));
	displayArtists(artists);
	displayFavorites(favoriteArtists);
}

/* ========== FILTER ========== */
// Filter artists //
export function filterArtists(){
	const selectElement = document.querySelector("#artist-filter-by__genre");
	if(selectElement.value === ""){
		displayArtists(artists);
		displayFavorites(favoriteArtists);
	}
	else{
		const filteredArtists = artists.filter(artist => artist.genres.includes(selectElement.value));
		const filteredFavorites = favoriteArtists.filter(artist => artist.genres.includes(selectElement.value));
		displayArtists(filteredArtists);
		displayFavorites(filteredFavorites);
	}
}

// Generate options for genrefilter //
export function generateFilterOptions(){
	const selectElement = document.querySelector("#artist-filter-by__genre");
	selectElement.innerHTML = "";
	const genres = new Set();
	const noneOption = document.createElement("option");
	noneOption.value = "";
	noneOption.textContent = "All";
	selectElement.insertAdjacentElement("beforeend", noneOption);
	for(const artist of artists){
		for(const genre of artist.genres){
			genres.add(genre.toLowerCase());
		}
	}
	for(const genre of genres){
		const option = document.createElement("option");
		option.value = genre;
		option.textContent = genre;
		selectElement.insertAdjacentElement("beforeend", option);
	}
}

/* ========== TOAST MESSAGE ========== */
// Function to display a toast message (mode is "success" or "error"). //
export function showToastMessage(message, mode="success") {
	const toastContainer = document.querySelector("#toast-container");
	const toast = document.createElement("div");
	toast.textContent = message;
	toast.classList.add("toast", mode);
	toastContainer.appendChild(toast);
	toast.classList.add("fade-out");
	setTimeout(() => {
		toastContainer.removeChild(toast);
	}, 3000);
}

/* ========== TOOLTIP FOR DETAIL DIALOG ========== */
export function addToolTip(element, text, isInsideAnotherElementWithTooltip) {
	const tooltip = document.querySelector("#detail-tooltip");
	function updateTooltipPos(event){
		tooltip.style.top = event.clientY - 10 + "px";
		tooltip.style.left = event.clientX - 110 + "px";
	}

	element.addEventListener("mouseenter", () => {
		tooltip.textContent = text;
		tooltip.style.display = "block";
		element.addEventListener("mousemove", updateTooltipPos);
	});
	element.addEventListener("mouseleave", () => {
		tooltip.textContent = "Show more details";
		if(!isInsideAnotherElementWithTooltip) tooltip.style.display = "none";
		element.removeEventListener("mousemove", updateTooltipPos);
	});
	window.addEventListener("scroll", updateTooltipPos);
}

export function showFilterMenu(){
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.removeEventListener("click", showFilterMenu);
	filterButton.addEventListener("click", hideFilterMenu);
	filterButton.classList.add("button-inset");
	const filterMenu = document.querySelector("#filter-sort");
	filterMenu.classList.remove("hidden");
}
function hideFilterMenu(){
	const filterButton = document.querySelector("#filter-sort-button");
	filterButton.removeEventListener("click", hideFilterMenu);
	filterButton.addEventListener("click", showFilterMenu);
	filterButton.classList.remove("button-inset");
	const filterMenu = document.querySelector("#filter-sort");
	filterMenu.classList.add("hidden");
}

function formatDate(dateString){
	const date = new Date(dateString);
	const dateFormatter = new Intl.DateTimeFormat("da-DK", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return dateFormatter.format(date);
}