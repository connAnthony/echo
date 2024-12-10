const postsWindow = document.querySelector(".postWindow");


async function fetchPosts() {
    const posts = await fetch("http://localhost:3000/");
    return posts.json();
}

fetchPosts().then(posts => {
    //posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";

        postElement.innerHTML = `
        <div class="post-header">
            <h2 class="title">
                <a href="blog.html?id=${post._id}" class="post-link">${post.title}</a>
            </h2>
            <div class="post-meta">
                <span class="author">${post.author}</span>
                <span class="date">${Date(post.date)}</span>
            </div>
        </div>
        <button class="deleteButton">Delete</button>
    `;

        const deleteButton = postElement.querySelector(".deleteButton");
        deleteButton.addEventListener("click", async () => {
            postsWindow.removeChild(postElement);
            return await fetch(`http://localhost:3000/delete/id/${post._id}`);
        });
        postsWindow.appendChild(postElement);
    });
}).catch(error => {
    console.error("Error fetching posts:", error);
});


