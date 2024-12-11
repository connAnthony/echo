const organizerInput = document.getElementById("organizer");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const locationInput = document.getElementById("location");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const mediaInput = document.getElementById("media");

const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await submitEvent();
});

async function submitEvent() {
    const theOrganizer = organizerInput.value;
    const theTitle = titleInput.value;
    const theDescription = descriptionInput.value;
    const theLocation = locationInput.value;
    const theDate = dateInput.value;
    const theTime = timeInput.value;
    const theMedia = mediaInput.value;

    console.log(theOrganizer, theTitle, theDescription, theLocation, theDate, theTime, theMedia);

    if (theOrganizer && theTitle && theDescription && theLocation && theDate && theTime) {
        try {
            await fetch("http://localhost:3000/event/new", {
                method: "POST",
                body: JSON.stringify({
                    organizer: theOrganizer,
                    title: theTitle,
                    description: theDescription,
                    location: theLocation,
                    date: theDate,
                    time: theTime,
                    contentURL: theMedia
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            alert("Event submitted successfully.");
        } catch (error) {
            console.error("Error submitting event:", error);
            alert("Failed to submit the event. Please try again.");
        }
    } else {
        alert("All fields except media are required.");
    }

    // Clear the form fields
    organizerInput.value = '';
    titleInput.value = '';
    descriptionInput.value = '';
    locationInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    mediaInput.value = '';
}
