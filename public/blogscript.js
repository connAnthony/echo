// blogscript.js

// Function to get query parameter by name from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch the post by ID
async function fetchPost(id) {
    try {
        console.log(`http://localhost:3000/post/id/${id}`)
        const response = await fetch(`http://localhost:3000/post/id/${id}`);
        const post = await response.json();
        if (response.ok) {
            return post;
        } else {
            throw new Error("Post not found");
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

// Function to render the post
function renderPost(post) {
    const postContainer = document.querySelector(".postContainer");

    postContainer.innerHTML = `
        <div class="post-header">
            <h1 class="title">${post.title}</h1>
            <div class="post-meta">
                <span class="author">${post.author}</span>
                <span class="date">${Date(post.date)}</span>
            </div>
        </div>
        <div class="post-content">
            <p>${post.text}</p>
        </div>
    `;
}

// Main script
document.addEventListener("DOMContentLoaded", async () => {
    const postId = getQueryParam("id");
    if (postId) {
        const post = await fetchPost(postId);
        if (post) {
            renderPost(post);
        } else {
            document.querySelector(".postcontainer").innerHTML = "<p>Post not found.</p>";
        }
    } else {
        document.querySelector(".postcontainer").innerHTML = "<p>Invalid post ID.</p>";
    }
});
