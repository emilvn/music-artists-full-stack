/**
 * extracts values from form input elements to an object
 * @param {HTMLFormElement} form form to extract values from
 * @returns {Object} an object containing artist information
 */
export function getArtistDataFromInput(form) {
	return {
		name: form.artistName.value,
		birthdate: form.birthdate.value,
		activeSince: form.activeSince.value,
		genres: form.genres.value.split(",").map(genre => genre.trim()),
		labels: form.labels.value.split(",").map(genre => genre.trim()),
		roles: form.roles.value.split(",").map(genre => genre.trim()),
		website: form.website.value,
		image: form.image.value,
		shortDescription: form.shortDescription.value
	}
}