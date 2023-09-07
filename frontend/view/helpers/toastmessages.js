/**
 * showToastMessage
 * function for showing toast messages on the page
 * @param {string} message message to be displayed
 * @param {string} mode to determine color, "success" = green, "error" = red, success is default
 */
export function showToastMessage(message, mode = "success") {
	const toastContainer = document.querySelector("#toast-container");
	const toast = document.createElement("div");
	toast.textContent = message;
	toast.classList.add("toast", mode);
	toastContainer.appendChild(toast);
	toast.classList.add("fade-docs");
	setTimeout(() => {
		toastContainer.removeChild(toast);
	}, 3000);
}