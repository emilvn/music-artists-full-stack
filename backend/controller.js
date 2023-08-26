import fs from "fs/promises";
import {v4 as uuidv4} from "uuid";

async function getArtists(path){
	const data = await fs.readFile(path);
	return JSON.parse(String(data));
}

function writeArtistsToFile(artistsArr, path){
	fs.writeFile(path, JSON.stringify(artistsArr));
}


export async function getArtistsData(req, res){
	const artists = await getArtists("artists.json");
	res.json(artists);
}

export async function addArtistData(req, res){
	const artists = await getArtists("artists.json");
	const newArtist = req.body;
	newArtist.id = uuidv4();
	artists.push(newArtist);
	writeArtistsToFile(artists, "artists.json");

	res.json(artists);
}

export async function updateArtistData(req, res){
	const id = req.params.id;
	const artists = await getArtists("artists.json");
	const artistToUpdate = artists.find(artist => artist.id === id);
	const body = req.body;

	artistToUpdate.name = body.name;
	artistToUpdate.birthdate = body.birthdate;
	artistToUpdate.activeSince = body.activeSince;
	artistToUpdate.genres = body.genres;
	artistToUpdate.labels = body.labels;
	artistToUpdate.website = body.website;
	artistToUpdate.roles = body.roles;
	artistToUpdate.image = body.image;
	artistToUpdate.shortDescription = body.shortDescription;

	writeArtistsToFile(artists, "artists.json");
	res.json(artists);
}

export async function deleteArtist(req, res){
	const id = req.params.id;
	const artists = await getArtists("artists.json");

	const updatedArtists = artists.filter(artist => artist.id !== id);

	writeArtistsToFile(updatedArtists, "artists.json");
	res.json(updatedArtists);
}

export async function getFavoritesData(req, res){
	const favorites = await getArtists("favorites.json");
	res.json(favorites);
}

export async function addFavorite(req, res){
	const favorites = await getArtists("favorites.json");
	const artist = req.body;
	if(!favorites.find(favorite => favorite.id === artist.id)){
		favorites.push(artist);
		writeArtistsToFile(favorites, "favorites.json");
	}
	res.json(favorites);
}

export async function removeFromFavorites(req, res){
	const favorites = await getArtists("favorites.json");
	const id = req.params.id;

	const updatedFavorites = favorites.filter(artist => artist.id !== id);

	writeArtistsToFile(updatedFavorites, "favorites.json");
	res.json(updatedFavorites);
}