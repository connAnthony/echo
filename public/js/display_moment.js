// display_moment.js

// Function to get query parameter by name from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch the moment by ID
async function fetchMoment(id) {
    try {
        const response = await fetch(`http://localhost:3000/moment/id/${id}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Moment not found");
        }
    } catch (error) {
        console.error("Error fetching moment:", error);
        return null;
    }
}

// Function to render the moment
function renderMoment(moment) {
    const momentContainer = document.querySelector(".momentContainer");

    momentContainer.innerHTML = `
        <div class="single-moment-header">
            <h1 class="title">${moment.title}</h1>
            <div class="single-moment-meta">
                <span class="organizer">${moment.organizer}</span>
                <span class="date">${new Date(moment.date).toLocaleDateString()}</span>
                <span class="time">${moment.time || ""}</span>
                <span class="location">${moment.location}</span>
            </div>
        </div>
        <div class="moment-content">
            <p>${moment.description}</p>
            ${moment.contentURL ? `<img src="${moment.contentURL}" alt="Moment image" class="moment-image">` : ""}
        </div>
    `;
}

// Main script
document.addEventListener("DOMContentLoaded", async () => {
    const momentId = getQueryParam("id");
    if (momentId) {
        const moment = await fetchMoment(momentId);
        if (moment) {
            renderMoment(moment);
        } else {
            document.querySelector(".momentContainer").innerHTML = "<p>Moment not found.</p>";
        }
    } else {
        document.querySelector(".momentContainer").innerHTML = "<p>Invalid moment ID.</p>";
    }
});
