import {displayArtists, scrollToTop} from "./display.js";
import {submitArtistCreate} from "./submit.js";

window.addEventListener("load", main);

const endpoint = "http://localhost:3333";
let artists;

async function main(){
	await getArtists();
	displayArtists(artists);
	setEventListeners();
}

function setEventListeners(){
	document.querySelector("#form-create").addEventListener("submit", submitArtistCreate);
}

async function getArtists(){
	const response = await fetch(endpoint + "/artists")
	if(response.ok){
		artists = await response.json();
	}
}

export async function addArtist(artist){
	const response = await fetch(endpoint + "/artists", {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(artist)
	});

	if(response.ok){
		artists.push(artist);
		displayArtists(artists);
		scrollToTop();
	}
}