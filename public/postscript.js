const authorInput = document.getElementById("author");
const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const mediaInput = document.getElementById("media");


const submitButton = document.getElementById("submit");




submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await submitPost();
});



async function submitPost() {
    // got this template from freecodecamp
    let theAuthor = authorInput.value;
    let theTitle = titleInput.value;
    let theText = textInput.value;
    let theMedia = mediaInput.value;
    console.log(theText);
    console.log(theTitle);
    console.log(theAuthor);
    console.log(theMedia);
    if ((theText || theMedia) && theAuthor && theTitle) {
        await fetch("http://localhost:3000/new", {
            method: "POST",
            body: JSON.stringify({
            author: theAuthor,
            title: theTitle,
            text: theText,
            contentURL: theMedia 
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        });
    } else {
        alert("Must have author, title, and either/or text or media feilds filled out.");
    }
    authorInput.value = '';
    titleInput.value = '';
    textInput.value = '';
    mediaInput.value = '';
    alert("Post submitted successfully.");
}