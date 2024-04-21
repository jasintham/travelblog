document.addEventListener('DOMContentLoaded', function() {
    const postContainer = document.getElementById('post_container');
    const gridOf4Posts = document.getElementById('grid_of_4_posts');
    const gridOf2Posts1 = document.getElementById('grid_of_2_posts_1');
    const gridOf2Posts2 = document.getElementById('grid_of_2_posts_2');

    // Function to fetch posts from the server
    function fetchPosts() 
    {
        fetch('http://localhost:3001/index/allPosts', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the authentication token stored in localStorage in the Authorization header.
            },
        })
        .then((response) => 
        {
            return response.json()
        })

        .then((response) => 
        {
            displayPosts(response)
        })

        .catch((error) => {
            console.error('Error loading posts:', error);
            displayError('Failed to load posts.'); // Display a user-friendly error message
        });
    }

    // Function to display posts in the DOM
    function displayPosts(response) 
    {
        if (response.length === 0) {
            postContainer.innerHTML = '<p>No posts to display.</p>';
            return;
        }

        // Create a grid and append to Post Container
        let divGrid = document.createElement('div');
        divGrid.className = 'row masonry-grid';
        postContainer.appendChild(divGrid);

        // Create a Column and append to Grid
        let divColumn = document.createElement('div');
        divColumn.className = 'col-md-6 col-lg-6 masonry-column';
        divGrid.appendChild(divColumn);

        response.forEach((postElement, postElementIndex) => 
        {
            console.log(postElementIndex); // Log the index of the current post element
            console.log(postElement); // Log the post element

            const postCard = createPostCard(postElement); 

            // Add event listener to the post card
            postCard.addEventListener('click', () => {
                // Assuming 'postElement.id' is how you uniquely identify posts
                window.location.href = `post.html?postId=${postElement.post_id}`;
            });


            divColumn.appendChild(postCard); // Append the post card to the current column

            if ((postElementIndex + 1) % 2 === 0) {
                // Create a new Column and append to the current Grid
                divColumn = document.createElement('div');
                divColumn.className = 'col-md-6 col-lg-6 masonry-column';
                divGrid.appendChild(divColumn);
            }

            if ((postElementIndex + 1) % 4 === 0) {
                // Create a new Grid and append it to the Post Container
                divGrid = document.createElement('div');
                divGrid.className = 'row masonry-grid';
                postContainer.appendChild(divGrid);
                // Also create a new column for the new grid
                divColumn = document.createElement('div');
                divColumn.className = 'col-md-6 col-lg-6 masonry-column';
                divGrid.appendChild(divColumn);
            }    
                    
            
        });
    }

    // Function to create a post card element
    function createPostCard(post) 
    {
        const card = document.createElement('div');
        card.className = 'card blog-card mb-3';
        card.innerHTML = `
            <img src="${post.cover_image}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="post-content-container">
                    <div class="post-meta post-meta-one">
                        <span class="post-meta-author">by <a href="#" class="bypostauthor">${post.username} </a></span>
                        <br>
                        <a href="#" class="post-meta-date">${post.post_date.substring(0, 10)}</a>
                    </div>
                    <a href="#" class="post-title"><h2>${post.title}</h2></a>
                    <div class="post-content">${post.content.substring(0, 100)}...</div>
                    <div class="post-meta post-meta-two">
                        <div class="sh-columns post-meta-comments">
                            <span class="post-meta-categories"><i class="fa-solid fa-heart" style="color: #ff0000;"></i></i></i> ${post.likes_count}</span>
                            <br>
                            <span class="post-meta-categories"><i class="fa-solid fa-comment" style="color: #74C0FC;"></i></i> ${post.comments_count}</span>
                            <br>
                            <hr>
                            <span class="post-meta-categories"> ${post.category_name}</span>
                            <a href="#" class="post-meta-comments"><i class="fa-solid fa-eye"></i></i>Click for more details</a>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return card;
    }





    // Function to display an error message
    function displayError(message) {
        postContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }

    // Call fetchPosts to load and display posts
    fetchPosts();

});


//................................. NAV BAR ITEM's RELATED CODES .................................//


//Login Nav Item Related Code
addEventListener('DOMContentLoaded', ()=>
{
    if(localStorage.getItem('token'))
    {
        const loginNavItem = document.getElementById('login_nav_item')
        loginNavItem.style.display = 'none'
    }
});

//Logout Nav Item Related Code
addEventListener('DOMContentLoaded', ()=>
{
    if(localStorage.getItem('token'))
    {
        const loginNavItem = document.getElementById('logout_nav_item')
        loginNavItem.style.display = 'block'
    }
});


//Logout related code
const logoutLink = document.getElementById('logout_nav_item');

logoutLink.addEventListener('click', ()=>
{
    localStorage.removeItem('token');
    window.location.href = 'index.html'
});