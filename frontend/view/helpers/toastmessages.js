/**
 * function for showing toast messages on the page
 * @param {string} message message to be displayed
 * @param {string} mode to determine color, "success" = green, "error" = red, success is default
 * @param {HTMLDialogElement|undefined} dialogElement HTML dialog in which to display the toast message, or undefined if not in dialog
 */
export function showToastMessage(message, mode = "success", dialogElement) {
	let toastContainer = document.querySelector("#toast-container");
	if(dialogElement){
		toastContainer = dialogElement.querySelector(".toast-container");
	}
	const toast = document.createElement("div");
	toast.textContent = message;
	toast.classList.add("toast", mode);
	toastContainer.appendChild(toast);
	toast.classList.add("fade-docs");
	setTimeout(() => {
		toastContainer.removeChild(toast);
	}, 3000);
}