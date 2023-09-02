/* ========== IMPORTS ========== */
import {endpoint} from "../main.js";
import {selectedArtist} from "../controller/controller.js";

// global variables for artists and favorite artists //
export let favoriteArtists = [];
export let artists;

/* ========== FETCH ARTISTS AND FAVORITES ========== */

// Function to fetch artists from the server //
export async function getArtists(){
	const response = await fetch(endpoint + "/artists")
	if(response.ok){
		artists = await response.json();
	}
}

// function to fetch specific artist from the server //
export async function getSpecificArtist(artist){
	return await fetch(endpoint + "/artists/" + artist.id);
}

// Function to fetch favorite artists from the server //
export async function getFavorites(){
	const response = await fetch(endpoint + "/favorites");
	if(response.ok){
		favoriteArtists = await response.json();
	}
}

/* ========== ADD ARTIST AND FAVORITE ARTIST ========== */

// Function to add a new artist to the server //
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
	}
	return response;
}

// Function to add an artist to favorites on the server //
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
	}
	return response;
}

/* ========== UPDATE ARTIST ========== */

// Function to update artist details on server //
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

	return await fetch(endpoint + "/artists/" + selectedArtist.id, {
		method: "PUT",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(artistToUpdate)
	});
}

/* ========== DELETE ARTIST ========== */

// Delete artist from server //
export async function deleteArtist(artistToDelete){
	const response = await fetch(endpoint + "/artists/" + artistToDelete.id, {
		method: "DELETE"
	});
	if(response.ok){
		artists = artists.filter(artist => artist.id !== artistToDelete.id);
	}
	return response;
}

/* ========== REMOVE ARTIST FROM FAVORITES ========== */

// Removes artist from favorites on the server //
export async function removeFromFavorites(artistToRemove){
	const response = await fetch(endpoint + "/favorites/" + artistToRemove.id, {
		method: "DELETE"
	});
	if(response.ok){
		favoriteArtists = favoriteArtists.filter(artist => artist.id !== artistToRemove.id);
	}
	return response;
}