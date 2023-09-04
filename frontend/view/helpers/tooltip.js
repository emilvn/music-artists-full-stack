/* ========== TOOLTIP FOR DETAIL DIALOG ========== */
export function addToolTip(tooltipElement, element, text, isInsideAnotherElementWithTooltip) {
	function updateTooltipPos(event) {
		tooltipElement.style.top = event.clientY - 10 + "px";
		tooltipElement.style.left = event.clientX - 110 + "px";
	}

	element.addEventListener("mouseenter", () => {
		tooltipElement.textContent = text;
		tooltipElement.style.display = "block";
		element.addEventListener("mousemove", updateTooltipPos);
	});
	element.addEventListener("mouseleave", () => {
		tooltipElement.textContent = "Show more details";
		if (!isInsideAnotherElementWithTooltip) tooltipElement.style.display = "none";
		element.removeEventListener("mousemove", updateTooltipPos);
	});
	window.addEventListener("scroll", updateTooltipPos);
}