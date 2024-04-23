document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3001/allposts/getAllPosts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  })
  .then(posts => {
    const postsContainer = document.getElementById('posts_container');
    postsContainer.innerHTML = ''; // Clear any existing content

    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'container-fluid post-card'; // Added 'post-card' class for styling
      postCard.style.maxWidth = '75%';
      postCard.style.margin = '20px auto';
      postCard.innerHTML = `
        <div class="post" style="font-size: 0.9rem; padding: 10px;">

          <p class="post-title">${post.title}</p>

          <p class="updatedtime mt-0 ms-3">
            <small>Posted on ${new Date(post.post_date).toLocaleDateString()}</small>
          </p>

          <img src="${post.cover_image}" class="post-img" alt="Post Image" style="max-width: 600px; width: 100%; height: auto;">
          
          <div class="post-body mt-3">
            <p class="post-text pt-3">${post.content.substring(0, 100)}...</p>     
            <hr>
            <br>
            <div class="blog-icons">

              <div class="icons-left">
                <!-- Like Button with link to specific post page -->
                <button class="btn icon-button">
                  <i class="fa-regular fa-heart fa-lg"></i> <p class="like-number count-style">${post.likes_count}</p>
                </button>
                
                <!-- Comment Button with link to specific post page -->
                <button class="btn icon-button">
                <i class="fa-regular fa-comment fa-lg"></i> <p class="comment-number count-style">${post.comments_count}</p>
                </button>
              </div>

              <div class="icons-right">
                <!-- Edit Button with link to specific post page -->
                <button class="btn icon-button">
                  <i class="fa-regular fa-pen-to-square fa-lg"></i>
                </button>

                <!-- Delete Button with link to specific post page -->
                <button class="btn icon-button">
                  <i class="fa-solid fa-trash-can fa-lg"></i>
                </button>
              </div>

            </div>

          </div>
        </div>
      `;
      postsContainer.appendChild(postCard);
    });
  })
  .catch(error => {
    console.error('Error loading posts:', error);
    const postsContainer = document.getElementById('posts_container');
    postsContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
  });
});
