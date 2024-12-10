const eventsWindow = document.querySelector(".eventsWindow");

async function fetchEvents() {
    try {
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

fetchEvents().then(events => {
    events.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.className = "event";

        eventElement.innerHTML = `
        <div class="event-header">
            <h2 class="event-title">
                <a href="event.html?id=${event._id}" class="event-link">${event.title}</a>
            </h2>
            <div class="event-meta">
                <span class="location">${event.location}</span>
                <span class="date">${Date(event.date)}</span>
            </div>
        </div>
        <button class="deleteEventButton">Delete</button>
    `;

        const deleteButton = eventElement.querySelector(".deleteEventButton");
        deleteButton.addEventListener("click", async () => {
            eventsWindow.removeChild(eventElement);
            try {
                await fetch(`http://localhost:3000/events/delete/id/${event._id}`, { method: "DELETE" });
                console.log(`Event ${event._id} deleted successfully.`);
            } catch (error) {
                console.error(`Error deleting event with ID ${event._id}:`, error);
            }
        });

        eventsWindow.appendChild(eventElement);
    });
}).catch(error => {
    console.error("Error displaying events:", error);
});
