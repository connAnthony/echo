const postContainer = document.getElementById("postContainer");

// Extract the post ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

// Fetch and display the specific post
async function fetchPost() {
    try {
        const response = await fetch(`http://localhost:3000/post/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch the post.");

        const post = await response.json();

        // Format the date
        const postDate = new Date(post.date);
        const formattedDate = `${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}`;

        // Render the post
        postContainer.innerHTML = `
            <article>
                <h2>${post.title}</h2>
                <p><strong>Author:</strong> ${post.author}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p>${post.text}</p>
            </article>
        `;
    } catch (error) {
        console.error("Error fetching the post:", error);
        postContainer.innerHTML = `<p>Error loading the post. Please try again later.</p>`;
    }
}

// Call the function to fetch and display the post
fetchPost();
