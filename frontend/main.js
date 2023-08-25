import {displayArtists, scrollToTop} from "./display.js";
import {submitArtistCreate} from "./submit.js";

window.addEventListener("load", main);

const endpoint = "http://localhost:3333";
let artists;
let selectedArtist;

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
	form.scrollIntoView({ behavior: "smooth" });
}

export async function updateArtist(updatedArtist){

	const response = await fetch(endpoint + "/artists/" + updatedArtist.id, {
		method: "PUT",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(updatedArtist)
	});
	if(response.ok){
		const artistToUpdate = artists.find(artist => artist.id === selectedArtist.id);
		artistToUpdate.name = updatedArtist.name;
		artistToUpdate.birthdate = updatedArtist.birthdate;
		artistToUpdate.activeSince = updatedArtist.activeSince;
		artistToUpdate.image = updatedArtist.image;
		artistToUpdate.genres = updatedArtist.genres;
		artistToUpdate.labels = updatedArtist.labels;
		artistToUpdate.roles = updatedArtist.roles;
		artistToUpdate.website = updatedArtist.website;
		artistToUpdate.shortDescription = updatedArtist.shortDescription;

		displayArtists(artists);
		scrollToTop();
	}
}