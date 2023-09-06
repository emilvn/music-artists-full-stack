// global variables for artists and favorite artists //
import {endpoint} from "../main.js";
import {selectedArtist} from "../controller/helpers/selectartist.js";

export let favoriteArtists = [];


/* ========== FETCH FAVORITE ARTISTS ========== */
// Function to fetch favorite artists from the server //
export async function getFavorites() {
	const response = await fetch(endpoint + "/favorites");
	if (response.ok) {
		favoriteArtists = await response.json();
	}
	else {
		console.error(await response.json());
	}
}

/* ========== ADD ARTIST AND FAVORITE ARTIST ========== */
// Function to add an artist to favorites on the server //
export async function addToFavorites(artist) {
	const response = await fetch(endpoint + "/favorites", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(artist)
	});
	if (response.ok) {
		favoriteArtists = await response.json();
	}
	else {
		console.error(await response.json());
	}
	return response;
}

/* ========== UPDATE ARTIST IN FAVORITES ========== */
// updates artist in favorites on the server //
/* ========== UPDATE ARTIST ========== */
// Function to update artist details on server //
export async function updateFavoriteArtist(updatedArtist){
	const artistToUpdate = favoriteArtists.find(artist => artist.id === updatedArtist.id);

	for(const key in artistToUpdate){
		if(key !== "id"){
			artistToUpdate[key] = updatedArtist[key];
		}
	}

	const response = await fetch(endpoint + "/favorites/" + updatedArtist.id, {
		method: "PUT",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(updatedArtist)
	});
	if(!response.ok){
		console.error(await response.json());
	}
	return response;
}

/* ========== REMOVE ARTIST FROM FAVORITES ========== */
// Removes artist from favorites on the server //
export async function removeFromFavorites(artistToRemove) {
	const response = await fetch(endpoint + "/favorites/" + artistToRemove.id, {
		method: "DELETE"
	});
	if (response.ok) {
		favoriteArtists = await response.json();
	}
	else {
		console.error(await response.json());
	}
	return response;
}

// function to change the cached favorite artists to match the filter option selected //
export function filterFavorites(filterValue){
	favoriteArtists = favoriteArtists.filter(artist =>
		artist.genres.map(genre => genre.toLowerCase()).includes(filterValue));
}