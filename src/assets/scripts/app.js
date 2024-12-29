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

let readingState = false;

const changeNavFunction = (mode) => {
	const homeEl = document.querySelector(".home");
	const homeLinkEl = homeEl.querySelector("a");
	const homeIcon = homeLinkEl.querySelector("i");

	if (mode === "back") {
		homeLinkEl.setAttribute("href", "javascript:void(0)");
		homeIcon.className = "fa-solid fa-chevron-left";
	} else if (mode === "home") {
		homeLinkEl.setAttribute("href", "#");
		homeIcon.className = "fas fa-home";
	}
};

const readingMode = (mode) => {
	if (mode) {
		bookContentContainer.classList.add("book-content--open");
		changeNavFunction("back");
		readingState = true;
	} else {
		bookContentContainer.classList.remove("book-content--open");
		changeNavFunction("home");
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
				const itemNumber = +itemEl.getAttribute("data-item-number");
				dropdownToggle.textContent = itemEl.textContent;
				switch (itemNumber) {
					case 1: {
						break;
					}
					case 2: {
						break;
					}
					case 3: {
						break;
					}
				}
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
