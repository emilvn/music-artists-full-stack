import {addArtist} from "./main.js";

export function submitArtistCreate(event){
	event.preventDefault();
	const form = event.target;

	const newArtist = {
		name: form.name.value,
		birthdate: form.birthdate.value,
		activeSince: form.activeSince.value,
		genres: form.genres.value.split(",").map(genre => genre.trim()),
		labels: form.labels.value.split(",").map(genre => genre.trim()),
		roles: form.roles.value.split(",").map(genre => genre.trim()),
		website: form.website.value,
		image: form.image.value,
		shortDescription: form.shortDescription.value
	}
	addArtist(newArtist);
	form.reset();
}