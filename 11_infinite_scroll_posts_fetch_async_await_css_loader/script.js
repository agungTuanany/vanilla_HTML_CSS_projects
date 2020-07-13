// DOM element
const postsContainer = document.getElementById("posts-container")
const loading        = document.querySelector(".loader")
const filter         = document.getElementById("filer")


// Global variables
let limit = 3;
let page = 1;


async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()

    return data
}

// Show post in DOM
async function showPost() {
    const posts = await getPosts()
    // console.log (posts)

    posts.forEach(post => {
        const postElement = document.createElement("div")
        postElement.classList.add("post")

        postElement.innerHTML = `
            <div class="number">${post.id}</div>
                <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;

        postsContainer.appendChild(postElement)
    })
}

// Show initial Posts
showPost()



