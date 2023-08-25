import fs from "fs/promises";
import {v4 as uuidv4} from "uuid";

async function getArtists(){
	const data = await fs.readFile("artists.json");
	return JSON.parse(data);
}

function writeArtistsToFile(artists){
	fs.writeFile("artists.json", JSON.stringify(artists));
}


async function getArtistsData(req, res){
	const artists = await getArtists();
	res.json(artists);
}

async function addArtistData(req, res){
	const artists = await getArtists();
	const newArtist = req.body;
	newArtist.id = uuidv4();

	artists.push(newArtist);
	writeArtistsToFile(artists);

	res.json(artists);
}

