import {favoriteArtists} from "../../model/favorites.js";
import {artists} from "../../model/artists.js";
import {displayArtists, displayFavorites} from "../../view/view.js";

/**
 * inputSearchChanged
 * function to filter the displayed artists based on the user search
 * @param {InputEvent} event event object of search bar input keyup/search event
 */
export function inputSearchChanged(event) {
	const searchValue = event.target.value;
	const filteredFavorites = favoriteArtists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(searchValue.toLowerCase()));
	displayFavorites(filteredFavorites);
	displayArtists(filteredArtists);
}