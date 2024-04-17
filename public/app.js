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
    const modalContent = modal.querySelector(".relative");
    const title = modal.querySelector("#modal-title");
    const displayNameElement = modal.querySelector("#modal-display-name");
    const formattedAddressElement = modal.querySelector("#modal-formatted-address");

    title.textContent = "Review link gevonden!";
    displayNameElement.textContent = displayName;
    formattedAddressElement.textContent = formattedAddress;
    
    document.getElementById("copy-button").onclick = function () {
        navigator.clipboard.writeText(`https://search.google.com/local/writereview?placeid=${placeId}`);
    };

    modal.classList.remove("hidden");

    // Ensure initial styles are in the DOM.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            modalContent.classList.add("opacity-100", "scale-100");
            modalContent.classList.remove("opacity-0", "scale-95");
        });
    });
}


function hideModal() {
	const modal = document.getElementById("modal");
	const modalContent = modal.querySelector(".relative");

	modalContent.classList.add("opacity-0", "scale-95");
	modalContent.classList.remove("opacity-100", "scale-100");

	setTimeout(() => {
		modal.classList.add("hidden");
	}, 300); // Ensure this matches the transition duration
}

window.onload = function () {
	document.getElementById("back-button").onclick = hideModal;
};
