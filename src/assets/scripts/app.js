// fix book content 
const bookContentElements = document.querySelectorAll(".book-content");
bookContentElements.forEach(bookContent => {
    bookContent.innerHTML = bookContent.innerHTML.replaceAll("\t\t\t\t", "");
})
//

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