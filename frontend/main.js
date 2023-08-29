import {
	displayArtists,
	displayFavorites,
	inputSearchChanged, inputSortChanged,
	scrollToTop,
	showCreateDialog, showToastMessage,
	showUpdateDialog
} from "./display.js";
import {submitArtistCreate, submitArtistUpdate} from "./submit.js";

window.addEventListener("load", main);

const endpoint = "http://localhost:3333";
export let artists;
let selectedArtist;
export let favoriteArtists = [];

async function main(){
	favoriteArtists = await getFavorites();
	artists = await getArtists();
	displayArtists(artists);
	displayFavorites(favoriteArtists);
	setEventListeners();
}

function setEventListeners(){
	document.querySelector("#add-artist-dialog-button")
		.addEventListener("click", showCreateDialog);
	const searchBar = document.querySelector("#artist-search");
	searchBar.addEventListener("search", inputSearchChanged);
	searchBar.addEventListener("keyup", inputSearchChanged);
	document.querySelector("#artist-sort")
		.addEventListener("change", inputSortChanged);
}

async function getArtists(){
	const response = await fetch(endpoint + "/artists")
	if(response.ok){
		return await response.json();
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
		artists = await response.json();
		displayArtists(artists);
		scrollToTop();
		showToastMessage(`${artist.name} added successfully!`,"success");
	}
	else{
		showToastMessage(`Error adding artist: ${response.status} ${response.statusText}`, "error");
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
	showUpdateDialog();
}

export async function updateArtist(updatedArtist){
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

	const response = await fetch(endpoint + "/artists/" + selectedArtist.id, {
		method: "PUT",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(artistToUpdate)
	});
	if(response.ok){
		displayArtists(artists);
		scrollToTop();
		showToastMessage(`${artistToUpdate.name} updated successfully!`,"success");
	}
	else {
		showToastMessage(`Error updating artist: ${response.status} ${response.statusText}`, "error");
	}
}

export async function deleteArtist(artistToDelete){
	const response = await fetch(endpoint + "/artists/" + artistToDelete.id, {
		method: "DELETE"
	});
	if(response.ok){
		artists = artists.filter(artist => artist.id !== artistToDelete.id);
		displayArtists(artists);
		showToastMessage( `${artistToDelete.name} deleted successfully!`, "success");
	}
	else{
		showToastMessage(`Error adding artist: ${response.status} ${response.statusText}`, "error");
	}
}

async function getFavorites(){
	const response = await fetch(endpoint + "/favorites");
	if(response.ok){
		return await response.json();
	}
}

export async function addToFavorites(artist){
	const response = await fetch(endpoint + "/favorites", {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(artist)
	});
	if(response.ok){
		favoriteArtists = await response.json();
		displayFavorites(favoriteArtists);
		scrollToTop();
		showToastMessage(`${artist.name} added to favorites!`, "success");
	}
	else{
		showToastMessage(`Error adding artist to favorites: ${response.status} ${response.statusText}`, "error");
	}
}

export async function removeFromFavorites(artistToRemove){
	const response = await fetch(endpoint + "/favorites/" + artistToRemove.id, {
		method: "DELETE"
	});
	if(response.ok){
		favoriteArtists = favoriteArtists.filter(artist => artist.id !== artistToRemove.id);
		displayFavorites(favoriteArtists);
		showToastMessage(`${artistToRemove.name} removed from favorites`, "success");
	}
	else{
		showToastMessage(`Error removing artist from favorites: ${response.status} ${response.statusText}`, "error");
	}
}