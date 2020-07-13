// DOM element
const postsContainer = document.getElementById("posts-container")
const loading        = document.querySelector(".loader")
const filter         = document.getElementById("filter")


// Global variables
let limit = 4;
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

// Show loader & fetch more posts
function showLoading() {
    loading.classList.add("show")

    setTimeout(() => {
        loading.classList.remove("show")

        // Show new post by increment page
        setTimeout(() => {
            page++
            showPost()
        }, 300)

    }, 1000)
}

// Infinite scroll
function infiniteScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 3) {
        // console.log ("you on bottom limit to scroll")

        showLoading()
    }

}

// Show initial Posts
showPost()

// Event listener
window.addEventListener("scroll", infiniteScroll)



