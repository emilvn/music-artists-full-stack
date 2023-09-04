import {addToolTip} from "../view/helpers/tooltip.js";

export function setTooltips() {
	const tooltip = document.querySelector("#detail-tooltip");
	const addArtistButton = document.querySelector("#add-artist-dialog-button");
	const filterButton = document.querySelector("#filter-sort-button");
	addToolTip(tooltip, addArtistButton, "Add new artist", false);
	addToolTip(tooltip, filterButton, "Show filter options", false);

}

export function setArtistTooltips(artistArticle, artist, containerID) {
	const tooltip = document.querySelector("#detail-tooltip");
	const editButton = artistArticle.querySelector(".edit-button");
	const deleteButton = artistArticle.querySelector(".delete-button");
	const favoriteButton = artistArticle.querySelector(".favorite-button");
	const websiteButton = artistArticle.querySelector(".website-button");
	addToolTip(tooltip, artistArticle, "Show more details", false);
	addToolTip(tooltip, editButton, "Edit artist details", true);
	addToolTip(tooltip, deleteButton, "Delete artist", true);
	addToolTip(tooltip, favoriteButton, (containerID === "#favorites") ? "Remove from favorites" : "Add to favorites", true);
	addToolTip(tooltip, websiteButton, artist.website.replace(/https?:\/\/www\./, ""), true);
}

export function setDetailDialogTooltips() {
	const tooltip = document.querySelector("#detail-dialog__tooltip");
	const websiteButton = document.querySelector("#artist-detail-dialog .website-button");
	const favoriteButton = document.querySelector("#artist-detail-dialog .favorite-button");
	const editButton = document.querySelector("#artist-detail-dialog .edit-button");
	const deleteButton = document.querySelector("#artist-detail-dialog .delete-button");
	const artistURLShortForm = websiteButton.querySelector("a")
		.href.replace(/https?:\/\/www\./, "");
	const favoriteButtonText = favoriteButton.querySelector("img")
		.alt;
	addToolTip(tooltip, websiteButton, artistURLShortForm, false);
	addToolTip(tooltip, favoriteButton, favoriteButtonText, false);
	addToolTip(tooltip, editButton, "Edit artist details", false);
	addToolTip(tooltip, deleteButton, "Delete artist", false);
}