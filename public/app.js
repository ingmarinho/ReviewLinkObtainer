async function initMap() {
	const input = document.getElementById("location-input");
	const autocomplete = new google.maps.places.Autocomplete(input, {
		fields: ["place_id", "formatted_address", "name", "geometry"],
		types: ["address"],
	});

	autocomplete.addListener("place_changed", () => {
		const place = autocomplete.getPlace();
		if (place.geometry) {
			input.value = place.formatted_address;

			console.log(place.place_id);

			showModal(place.place_id);
		} else {
            console.log(input.value);
			fetch(
				"https://places.googleapis.com/v1/places/ChIJ05IRjKHxEQ0RJLV_5NLdK2w?fields=id&key=AIzaSyADI0s_ZpwT7w3cG0l9TallblIwXFUMbt4",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						textQuery: input.value,
					}),
				}
			)
				.then((response) => {
					console.log(response.json());
				})
				.catch((error) => {
					console.error(error);
				});
		}
	});
}

function showModal(placeId) {
	const reviewLink = `https://search.google.com/local/writereview?placeid=${placeId}`;
	document.getElementById("review-link").textContent = reviewLink;
	document.getElementById("copy-button").onclick = function () {
		navigator.clipboard.writeText(reviewLink);
	};
	document.getElementById("modal").classList.remove("hidden");
}

function hideModal() {
	document.getElementById("modal").classList.add("hidden");
}

window.onload = function () {
	document.getElementById("back-button").onclick = hideModal;
};
