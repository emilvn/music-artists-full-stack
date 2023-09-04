export function addArtistTooltips(artistArticle, artist, containerID) {
	const editButton = artistArticle.querySelector(".edit-button");
	const deleteButton = artistArticle.querySelector(".delete-button");
	const favouriteButton = artistArticle.querySelector(".favorite-button");
	const websiteButton = artistArticle.querySelector(".website-button");
	addToolTip(artistArticle, "Show more details", false);
	addToolTip(editButton, "Edit artist details", true);
	addToolTip(deleteButton, "Delete artist", true);
	addToolTip(favouriteButton, (containerID === "#favorites") ? "Remove from favourites" : "Add to favourites", true);
	addToolTip(websiteButton, artist.website.replace(/https?:\/\/www\./, ""), true);
}

/* ========== TOOLTIP FOR DETAIL DIALOG ========== */
export function addToolTip(element, text, isInsideAnotherElementWithTooltip) {
	const tooltip = document.querySelector("#detail-tooltip");

	function updateTooltipPos(event) {
		tooltip.style.top = event.clientY - 10 + "px";
		tooltip.style.left = event.clientX - 110 + "px";
	}

	element.addEventListener("mouseenter", () => {
		tooltip.textContent = text;
		tooltip.style.display = "block";
		element.addEventListener("mousemove", updateTooltipPos);
	});
	element.addEventListener("mouseleave", () => {
		tooltip.textContent = "Show more details";
		if (!isInsideAnotherElementWithTooltip) tooltip.style.display = "none";
		element.removeEventListener("mousemove", updateTooltipPos);
	});
	window.addEventListener("scroll", updateTooltipPos);
}