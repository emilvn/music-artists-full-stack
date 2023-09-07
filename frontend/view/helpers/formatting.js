/**
 * helper function for formatting days before displaying
 * @param {string} dateString format YYYY-MM-DD
 * @return {string} formatted string example: 25. "April 1996"
 */
export function formatDate(dateString) {
	const date = new Date(dateString);
	const dateFormatter = new Intl.DateTimeFormat("da-DK", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return dateFormatter.format(date);
}