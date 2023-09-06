export function getFavorites(favoriteIDs, artists) {
	const favorites = [];
	for (const id of favoriteIDs) {
		const favoriteArtist = artists.find(artist => artist.id === id);
		favorites.push(favoriteArtist);
	}
	return favorites;
}