import {ValidationError} from "../errors/ValidationError.js";

/**
 * function to validate all properties of Artist object
 * @param {Artist} artist artist object to validate
 * @throws {ValidationError} rethrows if a property is invalid
 */
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

/**
 * function to validate artist name
 * @param {string} name artist name
 * @throws {ValidationError} if name not a string, or not between 3 and 30 characters long
 */
function validateName(name){
	if(typeof name !== "string" || name.length < 3 || name.length > 30) {
		throw new ValidationError("Invalid artist name");
	}
}

/**
 * function to validate artist name
 * @param {string} date artist birthdate/active since date
 * @throws {ValidationError} if date not a string and not in format YYYY-MM-DD
 */
function validateDate(date){
	if(typeof date !== "string" || !date.match(/^\d{4}-\d{2}-\d{2}$/)){
		throw new ValidationError("Invalid date, must be of format YYYY-MM-DD");
	}
}

/**
 * function to validate artist name
 * @param {string[]} arr artist genres/roles/labels
 * @throws {ValidationError} if not an array, or if empty array
 */
function validateArr(arr){
	if(!Array.isArray(arr) || arr.length === 0){
		throw new ValidationError("Invalid genres, roles or labels, must be an array with at least 1 value");
	}
}

/**
 * function to validate artist name
 * @param {string} url artist website/image url
 * @throws {ValidationError} if url is not a string or if url doesn't begin with http:// or https://
 */
function validateURL(url){
	if(typeof url !== "string" || !url.match(/^https?:\/\/[^\s/$.?#].\S*$/i)){
		throw new ValidationError("Invalid URL must begin with http:// or https://");
	}
}
/**
 * function to validate artist name
 * @param {string} description short description of artist
 * @throws {ValidationError} if description is not a string or not between 3 and 100 characters
 */
function validateDescription(description){
	if(typeof description !== "string" || description.length < 3 || description.length > 100){
		throw new ValidationError("Invalid description, must be between 3 and 100 characters");
	}
}