const months = ["March", "April", "May", "June", "July", "August"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const events = [];

let currentMonth = 0;
let editingIndex = null;

function renderCalendar() {
    const monthElement = document.getElementById("current-month");
    const daysElement = document.getElementById("days");

    monthElement.textContent = months[currentMonth];

    daysElement.innerHTML = "";

    const firstDayOfMonth = new Date(2025, currentMonth + 2, 1);
    const lastDayOfMonth = new Date(2025, currentMonth + 3, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    for (let i = 0; i < startingDay; i++) {
        daysElement.innerHTML += `<div class="day"></div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
        daysElement.innerHTML += `<div class="day">${i}</div>`;
    }

    renderEvents();
}

function renderEvents() {
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";

    events.forEach((event, index) => {
        const eventItem = document.createElement("div");
        eventItem.className = "event-item";
        eventItem.innerHTML = `
            <span>${event.date} - ${event.title}</span>
            <button class="edit" onclick="editEvent(${index})">Edit</button>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventsList.appendChild(eventItem);
    });
}

function addEvent() {
    const eventTitle = document.getElementById("event-title").value;
    const eventDate = document.getElementById("event-date").value;

    if (eventTitle && eventDate) {
        if (editingIndex !== null) {
            events[editingIndex] = { title: eventTitle, date: eventDate };
            editingIndex = null;
        } else {
            events.push({ title: eventTitle, date: eventDate });
        }
        renderEvents();
        document.getElementById("event-title").value = "";
        document.getElementById("event-date").value = "";
    } else {
        alert("Please fill in all fields.");
    }
}

function editEvent(index) {
    const event = events[index];
    document.getElementById("event-title").value = event.title;
    document.getElementById("event-date").value = event.date;
    editingIndex = index;
}

function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

function prevMonth() {
    if (currentMonth > 0) {
        currentMonth--;
        renderCalendar();
    }
}

function nextMonth() {
    if (currentMonth < months.length - 1) {
        currentMonth++;
        renderCalendar();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
});
