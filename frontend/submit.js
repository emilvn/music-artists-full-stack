import {addArtist} from "./main.js";

export function submitArtistCreate(event){
	event.preventDefault();
	const form = event.target;

	const newArtist = {
		name: form.name.value,
		birthdate: form.birthdate.value,
		activeSince: form.activeSince.value,
		genres: Array.from(form.genres.value),
		labels: Array.from(form.labels.value),
		roles: Array.from(form.roles.value),
		website: form.website.value,
		image: form.image.value,
		shortDescription: form.shortDescription.value
	}
	addArtist(newArtist);
	form.reset();
}