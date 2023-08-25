import fs from "fs/promises";


async function getArtists(){
	const data = await fs.readFile("artists.json");
	return JSON.parse(data);
}

function writeArtistsToFile(artists){
	fs.writeFile("artists.json", JSON.stringify(artists));
}


async function getMusicArtistData(req, res){
	const artists = await getArtists();
	res.json(artists);
}