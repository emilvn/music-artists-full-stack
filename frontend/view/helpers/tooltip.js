/**
 * addToolTip
 * function for adding a tooltip when hovering over certain elements
 * @param {HTMLElement} tooltipElement the tooltip div to be used
 * @param {HTMLElement|HTMLButtonElement|HTMLAnchorElement} element the element to show the tooltip for
 * @param {string} text the text shown in the tooltip
 * @param {boolean} showOnMouseLeave to determine if tooltip should still be shown on mouseleave
 */
export function addToolTip(tooltipElement, element, text, showOnMouseLeave) {
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
		if (!showOnMouseLeave) tooltipElement.style.display = "none";
		element.removeEventListener("mousemove", updateTooltipPos);
	});
	window.addEventListener("scroll", updateTooltipPos);
}