/* ========== IMPORTS ========== */
import {setArtistEventListeners,} from "../controller/seteventlisteners.js";
import {formatDate} from "./helpers/formatting.js";

import {setArtistTooltips} from "../controller/settooltips.js";

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
                <p>Born: ${formatDate(artist.birthdate)}</p>
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
	setArtistTooltips(artistArticle, artist, containerID);
}

// function for generating and inserting html list elements from an array into a container //
export function generateListFromArray(arr, container){
	for(const item of arr){
		container.insertAdjacentHTML("beforeend", `<li>${item}</li>`);
	}
}