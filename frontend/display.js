/* ========== IMPORTS ========== */
import {addToFavorites, artists, deleteArtist, favoriteArtists, removeFromFavorites, selectArtist} from "./main.js";
import {submitArtistCreate, submitArtistUpdate} from "./submit.js";

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
            <div>
                <h3>${artist.name}</h3>
                <img src="${artist.image}" alt="">
            </div>
            <div>
                <p>${artist.shortDescription}</p>
                <p>Date of birth: ${artist.birthdate}</p>
                <a href="${artist.website}">${artist.website}</a>
            </div>
            <div>
            	<button class="edit-button">Edit</button>
            	<button class="delete-button">Delete</button>
            	<button class="favorite-button">${(containerID === "#favorites")?"Remove from favorites":"Add to favorites"}</button>
			</div>
        </article>
	`;
	container.insertAdjacentHTML("beforeend", myHTML);

	/* ----- EVENT LISTENERS FOR ARTIST ----- */
	const artistArticle = container.querySelector("article:last-child");

	// edit, delete, and favorite buttons. //
	artistArticle.querySelector(".edit-button")
		.addEventListener("click", ()=>selectArtist(artist));
	artistArticle.querySelector(".delete-button")
		.addEventListener("click", ()=>deleteArtist(artist));
	artistArticle.querySelector(".favorite-button")
		.addEventListener("click", ()=> ((containerID === "#favorites")?removeFromFavorites(artist):addToFavorites(artist)));
	// display artist details when article clicked. //
	artistArticle.addEventListener("click", ()=>showDetailDialog(artist));
}

// scroll to top of page. //
export function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ========== CREATE DIALOG ========== */
// Function to display the create artist dialog. //
export function showCreateDialog(){
	const form = document.querySelector("#form-create");
	form.addEventListener("submit", submitArtistCreate);
	form.parentElement.showModal();
	form.parentElement
		.addEventListener("close", ()=> removeSubmitEvent(form, submitArtistCreate))
	form.parentElement.querySelector(".dialog-close-button")
		.addEventListener("click", () => form.parentElement.close());
}

/* ========== UPDATE DIALOG ========== */
// Function to display the update artist dialog. //
export function showUpdateDialog(){
	const form = document.querySelector("#form-update");
	form.addEventListener("submit", submitArtistUpdate);
	form.parentElement.showModal();
	form.parentElement
		.addEventListener("close", ()=> removeSubmitEvent(form, submitArtistUpdate))
	form.parentElement.querySelector(".dialog-close-button")
		.addEventListener("click", () => form.parentElement.close());
}

// function to remove submit events from forms. //
function removeSubmitEvent(form, functionToRemove){
	form.reset();
	form.removeEventListener("submit", functionToRemove);
}

/* ========== DETAIL DIALOG ========== */
// Function to display the artist details in a dialog. //
export function showDetailDialog(artist){
	const dialog = document.querySelector("#artist-detail-dialog");

	// Populate the dialog with artist details. //
	dialog.querySelector("#detail-artist__name")
		.textContent = artist.name;
	dialog.querySelector("#detail-artist__image")
		.src = artist.image;
	dialog.querySelector("#detail-artist__short-description")
		.textContent = artist.shortDescription;
	dialog.querySelector("#detail-artist__date-of-birth")
		.textContent = artist.birthdate;
	dialog.querySelector("#detail-artist__active-since")
		.textContent = artist.activeSince;
	dialog.querySelector("#detail-artist__website")
		.href = artist.website;
	dialog.querySelector("#detail-artist__website")
		.textContent = artist.website;

	// Generate lists for genres, roles, and labels. //
	generateListFromArray(artist.genres, dialog.querySelector("#detail-artist__genres"));
	generateListFromArray(artist.roles, dialog.querySelector("#detail-artist__roles"));
	generateListFromArray(artist.labels, dialog.querySelector("#detail-artist__labels"));

	// close button event listener //
	dialog.querySelector("#detail-dialog__close-button")
		.addEventListener("click", () => {
			dialog.close();
		});

	dialog.showModal();
}

// function for generating and inserting html list elements from an array into a container //
function generateListFromArray(arr, container){
	container.innerHTML = "";
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
export function inputSortChanged(event){
	const sortValue = event.target.value;
	let sortedArtists = [];
	let sortedFavorites = [];
	if(sortValue === "name-ascending"){
		sortedArtists = artists.toSorted((a,b) => a.name.localeCompare(b.name));
		sortedFavorites = favoriteArtists.toSorted((a,b) => a.name.localeCompare(b.name));
	}
	else if(sortValue === "name-descending"){
		sortedArtists = artists.toSorted((a,b) => b.name.localeCompare(a.name));
		sortedFavorites = favoriteArtists.toSorted((a,b) => b.name.localeCompare(a.name));
	}
	else if(sortValue === "age-descending"){
		sortedArtists = artists.toSorted((a,b) => new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime());
		sortedFavorites = favoriteArtists.toSorted((a,b) => new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime());
	}
	else if(sortValue === "age-ascending"){
		sortedArtists = artists.toSorted((a,b) => new Date(b.birthdate).getTime() - new Date(a.birthdate).getTime());
		sortedFavorites = favoriteArtists.toSorted((a,b) => new Date(b.birthdate).getTime() - new Date(a.birthdate).getTime());
	}
	if(sortValue !== ""){
		displayArtists(sortedArtists);
		displayFavorites(sortedFavorites);
	}
	else{
		displayArtists(artists);
		displayFavorites(favoriteArtists);
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