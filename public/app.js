const input = document.getElementById("location-input");
const btnShowModal = document.getElementById("show-modal-btn");

btnShowModal.addEventListener("click", () => {
    if (input.value) {
        fetchPlaceTextSearch(input.value);
    }

    input.value = "";
});

function fetchPlaceTextSearch(query) {
	fetch("https://places.googleapis.com/v1/places:searchText", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Goog-FieldMask":
				"places.id,places.displayName,places.formattedAddress",
			"X-Goog-Api-Key": "AIzaSyADI0s_ZpwT7w3cG0l9TallblIwXFUMbt4",
		},
		body: JSON.stringify({ textQuery: query }),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.places && data.places.length > 0) {
				const place = data.places[0];
				showModal(
					place.id,
					place.formattedAddress,
					place.displayName.text
				);
			} else {
				console.error("No places found.");
			}
		})
		.catch((error) => {
			console.error("Failed to fetch place details:", error);
		});
}

function showModal(placeId, formattedAddress, displayName) {
	const modal = document.getElementById("modal");
	const title = modal.querySelector("#modal-title");

	title.textContent = `Review Link Gevonden voor ${displayName}`;
	document.getElementById("copy-button").onclick = function () {
		navigator.clipboard.writeText(
			`https://search.google.com/local/writereview?placeid=${placeId}`
		);
	};

	modal.classList.remove("hidden");
	modal.querySelector(".relative").classList.add("opacity-100", "scale-100");
}

function hideModal() {
	const modal = document.getElementById("modal");
	modal.classList.add("hidden");
	modal.querySelector(".relative").classList.add("opacity-0", "scale-95");
}

window.onload = function () {
	document.getElementById("back-button").onclick = hideModal;
};
