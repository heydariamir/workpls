const addBtn = document.querySelector(".btn--add");
const removeBtn = document.querySelector(".btn--remove");
const submitBtn = document.querySelector(".btn--submit");
const createScheduleList = document.getElementById("schedule-create__lists");
const onGoingTodosList = document.querySelector(".schedule-list__content");
const form = document.querySelector(".schedule-create__form");
const modal = document.querySelector(".modal");
const modalTitle = modal.querySelector(".modal__title");
const modalMessage = modal.querySelector(".modal__message");

const addBtnHandler = () => {
	const addTodoTemplate = document.getElementById("add-todo");
	const addTodoEl = document.importNode(addTodoTemplate.content, true);

	const lastTodoNumber =
		createScheduleList.lastElementChild.getAttribute("data-todo-number");
	const currentTodoNumber = +lastTodoNumber + 1;

	const todoList = addTodoEl.querySelector(".schedule-create__list");
	const todoNumberEl = todoList.querySelector(".todo-number");
	const removeBtn = todoList.querySelector(".btn--remove");

	todoList.setAttribute("data-todo-number", currentTodoNumber);
	todoNumberEl.textContent = currentTodoNumber;
	removeBtn.addEventListener("click", removeBtnHandler);

	createScheduleList.appendChild(addTodoEl);
};

const removeBtnHandler = (event) => {
	const lists = createScheduleList.querySelectorAll(".schedule-create__list");

	if (lists.length < 2) {
		modalTitle.textContent = "Oops!";
		modalMessage.textContent = "You Can Not Remove Everything, Can You? :)";
		modal.classList.add("active");
		return;
	}

	const currentRemoveBtn = event.target;
	const currentCreateScheduleList = currentRemoveBtn.closest(
		".schedule-create__list"
	);
	const listsArr = Array.from(lists);

	let currentTodoNumber =
		currentCreateScheduleList.getAttribute("data-todo-number");

	currentRemoveBtn.removeEventListener("click", removeBtnHandler);

	listsArr.splice(0, currentTodoNumber);

	currentCreateScheduleList.parentElement.removeChild(
		currentCreateScheduleList
	);

	for (let i = 0; i < listsArr.length; i++) {
		const list = listsArr[i];
		const todoNumberEl = list.querySelector(".todo-number");

		list.setAttribute("data-todo-number", currentTodoNumber);
		todoNumberEl.textContent = currentTodoNumber++;
	}
};

const submitBtnHandler = () => {};

const formHandler = (event) => {
	event.preventDefault();

	const scheduleLists = createScheduleList.querySelectorAll(
		".schedule-create__list"
	);

	const title = createScheduleList.querySelector("input[name='title']").value;
	const datas = [];

	for (const scheduleList of scheduleLists) {
		const inputs = scheduleList.querySelectorAll("input, textarea");
		const data = {};

		for (const input of inputs) {
			switch (input.getAttribute("name")) {
				case "todo":
					data.todo = input.value;
					break;
				case "start-date":
					data["start-date"] = `${input.value} 00:00:00`;
					break;
				case "end-date":
					data["end-date"] = `${input.value} 23:59:59:999`;
			}
		}

		datas.push(data);
	}

	renderOnGoingTodos("ADD", { title, datas });
};

const modalHandler = (event) => {
	const classes = event.target.classList;

	if (classes.contains("modal") || classes.contains("modal__confirm")) {
		modal.classList.remove("active");
	}
};

const getTimeDifference = (date1, date2) => {
	const startDate = new Date(date1).getTime();
	const endDate = new Date(date2).getTime();

	const distance = startDate - endDate;

	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	return {
		days,
		hours,
		minutes,
		seconds,
	};
};

const generateTimeEl = (startDate, endDate, remainingTimeEl, passedTimeEl) => {
	setInterval(() => {
		const currentDate = new Date();

		const remainingTime = getTimeDifference(endDate, currentDate);
		const passedTime = getTimeDifference(currentDate, startDate);

		const remainingTimeElContent = `Remaining: ${remainingTime.days - 1}D:${remainingTime.hours}H:${remainingTime.minutes}M:${remainingTime.seconds}S`
		const passedTimeElContent = `Passed: ${passedTime.days}D:${passedTime.hours}H:${passedTime.minutes}M:${passedTime.seconds}S`

		remainingTimeEl.textContent = remainingTimeElContent;
		passedTimeEl.textContent = passedTimeElContent;
	}, 1000);
};

const addOnGoingTodo = (userDatas) => {
	const listWrapperTemplateEl = document.getElementById("ongoing-todo");
	const listWrapperEl = document.importNode(
		listWrapperTemplateEl.content,
		true
	);

	const titleEl = listWrapperEl.querySelector(".schedule-list__title");
	titleEl.textContent = userDatas.title;

	for (const data of userDatas.datas) {
		const listElTemplate = document.getElementById("ongoing-todo-list");
		const listEl = document.importNode(listElTemplate.content, true);

		const todoEl = listEl.querySelector(".schedule-list__todo-title");
		todoEl.textContent = data.todo;

		const startDateEl = listEl.querySelector(".schedule-list__todo-date__start");
		const endDateEl = startDateEl.nextElementSibling.nextElementSibling;

		startDateEl.textContent = data["start-date"].split(" ")[0];
		endDateEl.textContent = data["end-date"].split(" ")[0];

		const remainingTimeEl = listEl.querySelector("#remaining-time");
		const passedTimeEl = listEl.querySelector("#passed-time");

		generateTimeEl(
			data["start-date"],
			data["end-date"],
			remainingTimeEl,
			passedTimeEl
		);

		listWrapperEl.querySelector(".schedule-list__wrapper").appendChild(listEl);
	}

	onGoingTodosList.appendChild(listWrapperEl);
};

const removeOnGoingTodo = () => {};

const renderOnGoingTodos = (operation, scheduleDatas) => {
	switch (operation) {
		case "ADD":
			addOnGoingTodo(scheduleDatas);
			break;
		case "REMOVE":
			removeOnGoingTodo(scheduleDatas);
			break;
	}
};

addBtn.addEventListener("click", addBtnHandler);
removeBtn.addEventListener("click", removeBtnHandler);
submitBtn.addEventListener("click", submitBtnHandler);
form.addEventListener("submit", formHandler);
modal.addEventListener("click", modalHandler);
