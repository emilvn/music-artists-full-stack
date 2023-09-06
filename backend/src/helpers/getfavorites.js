/**
 * @typedef {import(Artist)} Artist
 */

/**
 * getFavorites
 * gets array of artists whose id's are in favoriteIds
 * @param {string[]} favoriteIDs array of artist id's
 * @param {Artist[]} artists array of Artist objects
 */
export function getFavorites(favoriteIDs, artists){
	const favorites = [];
	for(const id of favoriteIDs){
		const favoriteArtist = artists.find(artist => artist.id === id);
		favorites.push(favoriteArtist);
	}
	return favorites;
}