// global variables for artists and favorite artists //
import {endpoint} from "../main.js";
import {selectedArtist} from "../controller/helpers/selectartist.js";

export let favoriteArtists = [];


/* ========== FETCH FAVORITE ARTISTS ========== */
// Function to fetch favorite artists from the server //
export async function getFavorites() {
	try {
		const response = await fetch(endpoint + "/favorites");
		if (response.ok) {
			favoriteArtists = await response.json();
		}
	} catch (err) {
		throw err;
	}
}

/* ========== ADD ARTIST AND FAVORITE ARTIST ========== */
// Function to add an artist to favorites on the server //
export async function addToFavorites(artist) {
	try {
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
		return response;
	} catch (err) {
		throw err;
	}
}

/* ========== UPDATE ARTIST IN FAVORITES ========== */
// updates artist in favorites on the server //
/* ========== UPDATE ARTIST ========== */
// Function to update artist details on server //
export async function updateFavoriteArtist(updatedArtist){
	const artistToUpdate = favoriteArtists.find(artist => artist.id === updatedArtist.id);
	artistToUpdate.name = updatedArtist.name;
	artistToUpdate.birthdate = updatedArtist.birthdate;
	artistToUpdate.activeSince = updatedArtist.activeSince;
	artistToUpdate.image = updatedArtist.image;
	artistToUpdate.genres = updatedArtist.genres;
	artistToUpdate.labels = updatedArtist.labels;
	artistToUpdate.roles = updatedArtist.roles;
	artistToUpdate.website = updatedArtist.website;
	artistToUpdate.shortDescription = updatedArtist.shortDescription;
	try{
		return await fetch(endpoint + "/favorites/" + updatedArtist.id, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(updatedArtist)
		});
	}
	catch (err){
		throw err;
	}
}

/* ========== REMOVE ARTIST FROM FAVORITES ========== */
// Removes artist from favorites on the server //
export async function removeFromFavorites(artistToRemove) {
	try {
		const response = await fetch(endpoint + "/favorites/" + artistToRemove.id, {
			method: "DELETE"
		});
		if (response.ok) {
			favoriteArtists = await response.json();
		}
		return response;
	} catch (err) {
		throw err;
	}
}