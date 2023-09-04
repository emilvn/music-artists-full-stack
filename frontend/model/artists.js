/* ========== IMPORTS ========== */
import {endpoint} from "../main.js";
import {selectedArtist} from "../controller/controller.js";
import {favoriteArtists} from "./favorites.js";

export let artists;

/* ========== FETCH ARTISTS ========== */
// Function to fetch artists from the server //
export async function getArtists(){
	try{
		const response = await fetch(endpoint + "/artists")
		if(response.ok){
			artists = await response.json();
		}
	}
	catch (err){
		throw err;
	}
}

// function to fetch specific artist from the server //
export async function getSpecificArtist(artist){
	try{
		return await fetch(endpoint + "/artists/" + artist.id);
	}
	catch (err){
		throw err;
	}
}

/* ========== ADD ARTIST ========== */
// Function to add a new artist to the server //
export async function addArtist(artist){
	try{
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
	catch (err){
		throw err;
	}
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

	const artistInFavorites = favoriteArtists.find(artist => artist.id ===selectedArtist.id);
	if(artistInFavorites){
		artistInFavorites.name = updatedArtist.name;
		artistInFavorites.birthdate = updatedArtist.birthdate;
		artistInFavorites.activeSince = updatedArtist.activeSince;
		artistInFavorites.image = updatedArtist.image;
		artistInFavorites.genres = updatedArtist.genres;
		artistInFavorites.labels = updatedArtist.labels;
		artistInFavorites.roles = updatedArtist.roles;
		artistInFavorites.website = updatedArtist.website;
		artistInFavorites.shortDescription = updatedArtist.shortDescription;
	}
	try{
		return await fetch(endpoint + "/artists/" + selectedArtist.id, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(artistToUpdate)
		});
	}
	catch (err){
		throw err;
	}
}

/* ========== DELETE ARTIST ========== */
// Delete artist from server //
export async function deleteArtist(artistToDelete){
	try{
		const response = await fetch(endpoint + "/artists/" + artistToDelete.id, {
			method: "DELETE"
		});
		if(response.ok){
			artists = await response.json();
		}
		return response;
	}
	catch (err){
		throw err;
	}
}