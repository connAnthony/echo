const postsWindow = document.querySelector(".postWindow");


async function fetchPosts() {
    const posts = await fetch("http://localhost:3000/");
    return posts.json();
}

fetchPosts().then(posts => {
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <h2>${post.title} - ${post.author}</h2>
            <p>${post.text}</p>
            <p>${Date(post.date)}</p>
        `;
        postsWindow.appendChild(postElement);
    });
}).catch(error => {
    console.error("Error fetching posts:", error);
});