export function validateArtist(artist){
	return validateName(artist.name)
		&& validateDate(artist.birthdate)
		&& validateDate(artist.activeSince)
		&& validateArr(artist.genres)
		&& validateArr(artist.labels)
		&& validateArr(artist.roles)
		&& validateURL(artist.website)
		&& validateURL(artist.image)
		&& validateDescription(artist.shortDescription);

}
function validateName(name){
	return typeof name === "string"
		&& name.length > 2
		&& name.length < 30;
}
function validateDate(date){
	return typeof date === "string"
		&& date.match(/^\d{4}-\d{2}-\d{2}$/);
}
function validateArr(arr){
	return Array.isArray(arr)
		&& arr.length > 0;
}
function validateURL(url){
	return typeof url === "string"
		&& url.match(/^https?:\/\/[^\s/$.?#].\S*$/i);
}

function validateDescription(description){
	return typeof description === "string"
		&& description.length >= 3
		&& description.length <= 100;
}