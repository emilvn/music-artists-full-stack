import {addToFavorites, deleteArtist, removeFromFavorites, selectArtist} from "./main.js";
import {submitArtistCreate, submitArtistUpdate} from "./submit.js";

export function displayArtists(artists){
	document.querySelector("#artists").innerHTML = "";
	for(const artist of artists){
		displayArtist(artist, "#artists");
	}
}

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

	container.querySelector("article:last-child .edit-button")
		.addEventListener("click", ()=>selectArtist(artist));

	container.querySelector("article:last-child .delete-button")
		.addEventListener("click", ()=>deleteArtist(artist));

	container.querySelector("article:last-child .favorite-button")
		.addEventListener("click", ()=> ((containerID === "#favorites")?removeFromFavorites(artist):addToFavorites(artist)));
}

export function displayFavorites(favorites){
	document.querySelector("#favorites").innerHTML = "";
	for(const artist of favorites){
		displayArtist(artist, "#favorites");
	}
}

export function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

export function showCreateDialog(){
	const form = document.querySelector("#form-create");
	form.addEventListener("submit", submitArtistCreate);
	form.parentElement.showModal();
	form.parentElement
		.addEventListener("close", ()=> removeSubmitEvent(form, submitArtistCreate))
	form.parentElement.querySelector(".dialog-close-button")
		.addEventListener("click", () => form.parentElement.close());
}

export function showUpdateDialog(){
	const form = document.querySelector("#form-update");
	form.addEventListener("submit", submitArtistUpdate);
	form.parentElement.showModal();
	form.parentElement
		.addEventListener("close", ()=> removeSubmitEvent(form, submitArtistUpdate))
	form.parentElement.querySelector(".dialog-close-button")
		.addEventListener("click", () => form.parentElement.close());
}

function removeSubmitEvent(form, functionToRemove){
	form.reset();
	form.removeEventListener("submit", functionToRemove);
}