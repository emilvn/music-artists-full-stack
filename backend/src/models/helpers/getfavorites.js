/**
 * getFavorites
 * gets array of artists whose ids are in favoriteIds
 * @param {string[]} favoriteIDs array of artist id's
 * @param {Artist[]} artists array of Artist objects
 * @returns {Artist[]} array of Artist objects
 */
export function getFavorites(favoriteIDs, artists){
	const favorites = [];
	for(const id of favoriteIDs){
		const favoriteArtist = artists.find(artist => artist.id === id);
		favorites.push(favoriteArtist);
	}
	return favorites;
}