const cardContainer = document.querySelector(".cardContainer");
const colors = ['red','yellow','gray','blue','green','pink','orange','purple','bisque','Azure'];
const totalCard = 20;
const colorsPicklist = [...colors, ...colors];


let revealedCount = 0;
let activeCard = null;
let awaitingEndOfMove = false;
for (let i = 0; i < totalCard; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const tile = buildCard(color);

	colorsPicklist.splice(randomIndex, 1);
	cardContainer.appendChild(tile);
}

function buildCard(color) {
	const element = document.createElement("div");

	element.classList.add("card");
	element.setAttribute("data-color", color);
	element.setAttribute("data-revealed", "false");

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element == activeCard
		) {
			return;
		}

		element.style.backgroundColor = color;

		if (!activeCard) {
			activeCard = element;

			return;
		}

		const colorToMatch = activeCard.getAttribute("data-color");

		if (colorToMatch === color) {
			element.setAttribute("data-revealed", "true");
			activeCard.setAttribute("data-revealed", "true");

			activeCard = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === totalCard) {
				alert("You win 🎉! Refresh to start again.");
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeCard.style.backgroundColor = null;
			element.style.backgroundColor = null;

			awaitingEndOfMove = false;
			activeCard = null;
		}, 1000);
	});

	return element;
}

