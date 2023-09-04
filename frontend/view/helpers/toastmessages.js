/* ========== TOAST MESSAGE ========== */
// Function to display a toast message (mode is "success" or "error"). //
export function showToastMessage(message, mode = "success") {
	const toastContainer = document.querySelector("#toast-container");
	const toast = document.createElement("div");
	toast.textContent = message;
	toast.classList.add("toast", mode);
	toastContainer.appendChild(toast);
	toast.classList.add("fade-out");
	setTimeout(() => {
		toastContainer.removeChild(toast);
	}, 3000);
}