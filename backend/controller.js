import fs from "fs/promises";
import {v4 as uuidv4} from "uuid";

async function getArtists(){
	const data = await fs.readFile("artists.json");
	return JSON.parse(data);
}

function writeArtistsToFile(artists){
	fs.writeFile("artists.json", JSON.stringify(artists));
}


export async function getArtistsData(req, res){
	const artists = await getArtists();
	res.json(artists);
}

export async function addArtistData(req, res){
	const artists = await getArtists();
	const newArtist = req.body;
	newArtist.id = uuidv4();

	artists.push(newArtist);
	writeArtistsToFile(artists);

	res.json(artists);
}

export async function updateArtistData(req, res){
	const id = req.params.id;
	const artists = await getArtists();

	const artistToUpdate = artists.find(artist => artist.id === id);
	const body = req.body;

	artistToUpdate.name = body.name;
	artistToUpdate.birthdate = body.birthdate;
	artistToUpdate.activeSince = body.activeSince;
	artistToUpdate.genres = body.genres;
	artistToUpdate.labels = body.labels;
	artistToUpdate.website = body.website;
	artistToUpdate.image = body.image;
	artistToUpdate.shortDescription = body.shortDescription;

	writeArtistsToFile(artists);
	res.json(artists);
}

export async function deleteArtist(req, res){
	const id = req.params.id;
	const artists = await getArtists();

	const updatedArtists = artists.filter(artist => artist.id !== id);

	writeArtistsToFile(updatedArtists);
	res.json(updatedArtists);
}