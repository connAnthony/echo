const postContainer = document.getElementById("postContainer");

// Utility function to get query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

// Fetch the specific post using its ID
async function fetchPostById(postId) {
    try {
        const response = await fetch(`http://localhost:3000/post/id/${postId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch the post.");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching the post:", error);
        return null;
    }
}

// Render the post in the container
function renderPost(post) {
    if (!post) {
        postContainer.innerHTML = "<h2>Post not found.</h2>";
        return;
    }

    postContainer.innerHTML = `
        <div class="post">
            <h2 class="title">${post.title}</h2>
            <div class="post-meta">
                <span class="author">${post.author}</span>
                <span class="date">${new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
        </div>
    `;
}

// Main function to load the post
async function loadPost() {
    const { id } = getQueryParams();

    if (!id) {
        postContainer.innerHTML = "<h2>No post ID specified in the URL.</h2>";
        return;
    }

    const post = await fetchPostById(id);
    renderPost(post);
}

// Load the post when the script runs
loadPost();
