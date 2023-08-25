import {deleteArtist, selectArtist} from "./main.js";

export function displayArtists(artists){
	document.querySelector("#artists").innerHTML = "";
	for(const artist of artists){
		displayArtist(artist);
	}
}

function displayArtist(artist){
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
			</div>
        </article>
	`;
	document.querySelector("#artists").insertAdjacentHTML("beforeend", myHTML);

	document.querySelector("#artists article:last-child .edit-button")
		.addEventListener("click", ()=>selectArtist(artist));

	document.querySelector("#artists article:last-child .delete-button")
		.addEventListener("click", ()=>deleteArtist(artist));
}

export function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}