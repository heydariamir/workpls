import { App } from "@capacitor/app";

App.addListener("backButton", () => {
	if(readingState) {
		readingMode(false);
	}
})

const listElements = document.querySelectorAll(".box ul");
const bookContentContainer = document.getElementById("book-content-container");
const bookContentWrapper = document.getElementById("book-content-wrapper");
const dropdownToggle = document.getElementById("dropdown-button-id");
const homeListItem = document.querySelector(".list-item__home");
const infoBoxes = document.querySelectorAll(".infobox-container a");
const homeBtn = document.querySelector(".home-btn");
const backBtn = document.querySelector(".back-btn");
const homeBtnMenu = document.querySelector(".list-item__home");

let readingState = false;

const toggleContent = (mode) => {
	if (mode === "open") {
		bookContentContainer.classList.add("book-content--open");
	} else if (mode === "close") {
		bookContentContainer.classList.remove("book-content--open");
	}
};

const readingMode = (mode) => {
	if (mode) {
		toggleContent("open");
		homeBtn.style["z-index"] = 10000;
		backBtn.style["z-index"] = 10001;
		readingState = true;
	} else {
		toggleContent("close");
		homeBtn.style["z-index"] = 10001;
		backBtn.style["z-index"] = 10000;
		readingState = false;
	}
};

// dropdown
document.addEventListener("DOMContentLoaded", () => {
	const dropdowns = document.querySelectorAll(".dropdown");
	dropdowns.forEach((dropdown) => {
		const dropdownToggle = dropdown.querySelector("button");
		const items = dropdown.querySelectorAll("li");
		items.forEach((item) => {
			item.addEventListener("click", (event) => {
				const itemEl = event.target;
				dropdownToggle.textContent = itemEl.textContent;
				dropdown.classList.remove("open");
				dropdownToggle.setAttribute("aria-expanded", "false");
			});
		});
	});
	document.addEventListener("click", (event) => {
		let clickedDropdown = null;
		dropdowns.forEach((dropdown) => {
			const toggle = dropdown.querySelector(".dropdown-toggle");
			if (!dropdown.contains(event.target)) {
				toggle.setAttribute("aria-expanded", false);
				dropdown.classList.remove("open");
			} else if (event.target === toggle) {
				clickedDropdown = dropdown;
			}
		});
		if (clickedDropdown) {
			const toggle = clickedDropdown.querySelector(".dropdown-toggle");
			const menu = clickedDropdown.querySelector(".dropdown-menu");
			const isExpanded = toggle.getAttribute("aria-expanded") === "true";
			toggle.setAttribute("aria-expanded", !isExpanded);
			clickedDropdown.classList.toggle("open", !isExpanded);
			if (!isExpanded) {
				menu.querySelectorAll("li").forEach((item, index) => {
					item.style.animationDelay = `${index * 0.1}s`;
				});
			}
		}
	});
});
// dropdown

const listElementsHandler = (event) => {
	const BookContentTitle = document.querySelector(".book-content-title");
	const listItem = event.target.closest("li");
	const listItemNumber = listItem.getAttribute("data-content-number");

	const bookContentTemplate = document.querySelector(
		".book-content-template"
	);
	console.log(bookContentTemplate);
	const bookContentEl = document.importNode(
		bookContentTemplate.content,
		true
	);
	const currentBookCOntentEl = bookContentEl.querySelector(
		`#book-content-${listItemNumber}`
	);
	BookContentTitle.textContent = currentBookCOntentEl
		.querySelector(".bold")
		.textContent.slice(0, -1);
	bookContentWrapper.innerHTML = "";
	bookContentWrapper.appendChild(currentBookCOntentEl);
	readingMode(true);
};

listElements.forEach((listElement) => {
	listElement.addEventListener("click", listElementsHandler);
});

homeListItem.addEventListener("click", () => {
	if (readingState) {
		readingMode(false);
	}
});

const dropdownToggleHandler = (opt) => {
	const infoBoxNumber = opt.infoBoxNumber;
	const mode = opt.mode;

	if (infoBoxNumber) {
		const infoBoxIndex = infoBoxNumber - 1;
		dropdownToggle.textContent = infoBoxes[infoBoxIndex].querySelector("h2").textContent;
	}

	if (mode === "show") {
		dropdownToggle.classList.remove("hidden");
	} else if (mode === "hide") {
		dropdownToggle.classList.add("hidden");
	}
};

infoBoxes.forEach((infoBox) => {
	const infoBoxNumber = infoBox.getAttribute("data-infobox-number");
	infoBox.addEventListener(
		"click",
		dropdownToggleHandler.bind(this, { mode: "show", infoBoxNumber })
	);
});

backBtn.addEventListener("click", () => {
	readingMode(false);
});

[homeBtnMenu, homeBtn].forEach((btn) => {
	console.log(btn);
	btn.addEventListener(
		"click",
		dropdownToggleHandler.bind(this, { mode: "hide" })
	);
});
