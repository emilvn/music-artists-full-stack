// global variables for artists and favorite artists //
import {endpoint} from "../main.js";

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