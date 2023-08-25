
export function displayArtists(artists){
	document.querySelector("#artists").innerHTML = "";
	for(const artist of artists){
		displayArtist(artist);
	}
}

function displayArtist(artist){
	const myHTML = /*html*/`
		<article>
            <div>
                <h3>${artist.name}</h3>
                <img src="${artist.image}" alt="">
            </div>
            <div>
                <p>${artist.shortDescription}</p>
                <p>Date of birth: ${artist.birthdate}</p>
                <a href="${artist.website}">${artist.website}</a>
            </div>
        </article>
	`;
	document.querySelector("#artists").insertAdjacentHTML("beforeend", myHTML);
}