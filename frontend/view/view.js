import {setArtistEventListeners,} from "../controller/seteventlisteners.js";
import {formatDate} from "./helpers/formatting.js";
import {setArtistTooltips} from "../controller/settooltips.js";

/**
 * function to display all artists
 * @param {Artist[]} artists array of artists to display
 */
export function displayArtists(artists){
	document.querySelector("#artists").innerHTML = "";
	for(const artist of artists){
		displayArtist(artist, "#artists");
	}
}

/**
 * function to display all favorites
 * @param {Artist[]} favorites array of favorites to display
 */
export function displayFavorites(favorites){
	document.querySelector("#favorites").innerHTML = "";
	for(const artist of favorites){
		displayArtist(artist, "#favorites");
	}
}

/**
 * function to display a single artist
 * @param {Artist} artist artist to display
 * @param {string} containerID id of html container to put artist into(#favorites/#artists)
 */
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

/**
 * helper function to generate li elements for each item in an array
 * @param {string[]} arr array of roles/genres/labels to display in list
 * @param {HTMLUListElement|HTMLOListElement} container html ul/ol element to put list into
 */
export function generateListFromArray(arr, container){
	for(const item of arr){
		container.insertAdjacentHTML("beforeend", `<li>${item}</li>`);
	}
}