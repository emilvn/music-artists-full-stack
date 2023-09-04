/* ========== SEARCH ========== */
// Function to handle input change for artist search bar. //
import {favoriteArtists} from "../../model/favorites.js";
import {artists} from "../../model/artists.js";
import {displayArtists, displayFavorites} from "../../view/view.js";

export function inputSearchChanged(event) {
	const searchValue = event.target.value;
	const filteredFavorites = favoriteArtists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	displayFavorites(filteredFavorites);
	displayArtists(filteredArtists);
}