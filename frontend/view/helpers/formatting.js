export function formatDate(dateString) {
	const date = new Date(dateString);
	const dateFormatter = new Intl.DateTimeFormat("da-DK", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return dateFormatter.format(date);
}