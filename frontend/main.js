import {displayArtists} from "./display.js";

window.addEventListener("load", main);

const endpoint = "http://localhost:3333";
let artists;

async function main(){
	await getArtists();
	console.log(artists);
	displayArtists(artists);
}

async function getArtists(){
	const response = await fetch(endpoint + "/artists")
	if(response.ok){
		artists = await response.json();
	}
}
