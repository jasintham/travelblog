window.onload = async () => {
  try {
    // Send request to fetch all posts
    const response = await fetch("http://localhost:3001/allposts/getAllPosts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Use JWT token stored locally for authentication
        "Content-Type": "application/json",
      },
    });
    const posts = await response.json(); // Parse the returned post data
    renderPosts(posts); // Call the function to render posts
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// Function to render posts to the page
function renderPosts(posts) {
  const postsContainer = document.querySelector(".posts-container");
  postsContainer.innerHTML = ""; // Clear posts container

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

// Function to create individual post elements
function createPostElement(post) {
  // create element for post
  const postList = document.createElement("li");
  postList.classList.add("post-list");
  postList.innerHTML = `
  <img src="${post.cover_image}" class="post-img" alt="Post Image">`;

  // create container for post
  const postContent = document.createElement("div");
  postContent.classList.add("main-post-img", "post-content");

  // fill in the postContent section
  postContent.innerHTML = `
      
      <a href="./post.html" class="post-topic">${post.title}</a>
      <p class="post-date"> ${new Date(post.post_date).toLocaleDateString()}</p>
      <p class="post-text">${post.content.substring(0, 100)}...</p>
  `;

  // create container for like and coments bar
  const postActions = document.createElement("div");
  postActions.classList.add("blog-actions");

  // add buttons
  postActions.innerHTML = `
  <div class="blog-actions">
  <div class="blog-icons">
  <div class="like">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="btn-like"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
    <p class="like-number">${post.comments_count}</p>
  </div>
  <div class="comment">
    <!-- Comment icon with link to specific post page -->
    <a href="./post.html">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="btn-comment"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
        />
      </svg>
    </a>
    <p class="comment-number">${post.comments_count}</p>
  </div>
</div>
</div>
  `;

  // Add containers to body
  postList.appendChild(postContent);
  postContent.appendChild(postActions);

  return postList;
}
