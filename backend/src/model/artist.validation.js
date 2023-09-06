// custom validation error //
class ValidationError extends Error{
	constructor(message) {
		super(message);
		this.name = "ValidationError";
		this.statusCode = 400;
	}
}
// throws an error if any artist detail is invalid //
export function validateArtist(artist){
	try{
		validateName(artist.name);
		validateDate(artist.birthdate);
		validateDate(artist.activeSince);
		validateArr(artist.genres);
		validateArr(artist.labels);
		validateArr(artist.roles);
		validateURL(artist.website);
		validateURL(artist.image);
		validateDescription(artist.shortDescription);
	}
	catch(err){
		throw err;
	}

}
// artist name must be a string between 3 and 30 characters //
function validateName(name){
	if(typeof name !== "string" || name.length < 3 || name.length > 30) {
		throw new ValidationError("Invalid artist name");
	}
}
// dates must be of format YYYY-MM-DD //
function validateDate(date){
	if(typeof date !== "string" || !date.match(/^\d{4}-\d{2}-\d{2}$/)){
		throw new ValidationError("Invalid date, must be of format YYYY-MM-DD");
	}
}
// genres, roles and labels must be arrays with at least 1 value
function validateArr(arr){
	if(!Array.isArray(arr) || arr.length === 0){
		throw new ValidationError("Invalid genres, roles or labels, must be an array with at least 1 value");
	}
}

// URLS must begin with http:// or https://
function validateURL(url){
	if(typeof url !== "string" || !url.match(/^https?:\/\/[^\s/$.?#].\S*$/i)){
		throw new ValidationError("Invalid URL must begin with http:// or https://");
	}
}
// description must be a string between 3 and 100 characters
function validateDescription(description){
	if(typeof description !== "string" || description.length < 3 || description.length > 100){
		throw new ValidationError("Invalid description, must be between 3 and 100 characters");
	}
}