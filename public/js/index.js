document.addEventListener('DOMContentLoaded', function() 
{
    const postContainer = document.getElementById('post_container');


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
            displayError('Failed to load posts. Please Login'); // Display a user-friendly error message
        });
    }

    // Function to display posts in the DOM
    function displayPosts(response) 
    {
        const postsContainer = document.getElementById('post_container');
        postsContainer.innerHTML = '';  // Clear existing posts

        if (response.length === 0) 
        {
            postContainer.innerHTML = '<p>No posts to display.</p>';
            return;
        }

        // Initialize a new row
        let divGrid = document.createElement('div');
        divGrid.className = 'row';

        response.forEach((postElement, index) => 
        {
            // Create a new column for each post
            const divColumn = document.createElement('div');
            divColumn.className = 'col-md-6'; // Set the column to take half of the width on medium devices
            divGrid.appendChild(divColumn);

            const postCard = createPostCard(postElement);
            divColumn.appendChild(postCard);

            // Add event listener to the post card
            postCard.addEventListener('click', () => {
                window.location.href = `post.html?postId=${postElement.post_id}`;
            });

            // Every two posts, append the current row to the container and start a new row
            if ((index + 1) % 2 === 0) {
                postContainer.appendChild(divGrid);
                divGrid = document.createElement('div');
                divGrid.className = 'row';
            }
        });

        // Append the last row if it has any posts
        if (response.length % 2 !== 0) 
        {
            postContainer.appendChild(divGrid);
        }
    }

    // Function to create a post card element
    function createPostCard(post) 
    {
        const card = document.createElement('div');
        card.className = 'card blog-card mb-3';
        card.innerHTML = `
            <img src="http://localhost:3001/${post.cover_image}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="post-content-container">
                    <div class="post-meta post-meta-one">
                    <img src="http://localhost:3001/${post.profile_picture}" id="author_image" alt="Avatar" class="main-post-avatar rounded-circle"/>
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









    //................................. SEARCH AN POST by NAV BAR .................................//
    const btn_search = document.getElementById('btn_search')
    btn_search.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally
        const searchQuery = document.getElementById('searchInput').value;

        fetch(`http://localhost:3001/index/search?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response); 
            displayPosts(response); // Call the displayPosts function to render the search results
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });
    });



    
    //................................. 1. SEARCH AN POST by CATEGORY "All" .................................//
    const btn_search_all = document.getElementById('btn_search_all')
    const btn_search_tips = document.getElementById('btn_search_tips')
    const btn_search_adventure = document.getElementById('btn_search_adventure')
    const btn_search_solo = document.getElementById('btn_search_solo')
    const btn_search_family = document.getElementById('btn_search_family')
    const btn_search_friends = document.getElementById('btn_search_friends')
    const btn_search_nature = document.getElementById('btn_search_nature')
    const btn_search_getaways = document.getElementById('btn_search_getaways')

    btn_search_all.addEventListener('click', (event)=>
    {
        event.preventDefault(); 

        fetch(`http://localhost:3001/index/allPosts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response); 
            displayPosts(response); // Call the displayPosts function to render the search results

            btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
            btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });

    });



    //................................. 2. SEARCH AN POST by CATEGORY "Travel Tips & Advice" .................................//
    btn_search_tips.addEventListener('click', function(event) {
        event.preventDefault(); 
        const searchQuery = document.getElementById('btn_search_tips').textContent;
        console.log(searchQuery)

        fetch(`http://localhost:3001/index/searchCategory?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response); 
            displayPosts(response); // Call the displayPosts function to render the search results

            btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
            btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });
    });

    //................................. 3. SEARCH AN POST by CATEGORY "Adventure Travel" .................................//
    btn_search_adventure.addEventListener('click', function(event) {
        event.preventDefault(); 
        const searchQuery = document.getElementById('btn_search_adventure').textContent;
        console.log(searchQuery)

        fetch(`http://localhost:3001/index/searchCategory?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response); 
            displayPosts(response); // Call the displayPosts function to render the search results

            btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
            btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });
    });


    //................................. 4. SEARCH AN POST by CATEGORY "Solo Travel" .................................//
    btn_search_solo.addEventListener('click', function(event) {
        event.preventDefault(); 
        const searchQuery = document.getElementById('btn_search_solo').textContent;
        console.log(searchQuery)

        fetch(`http://localhost:3001/index/searchCategory?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response); 
            displayPosts(response); // Call the displayPosts function to render the search results

            btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
            btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });
    });


    //................................. 5. SEARCH AN POST by CATEGORY "Family Travel" .................................//
    btn_search_family.addEventListener('click', function(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('btn_search_family').textContent;
        console.log(searchQuery)

        fetch(`http://localhost:3001/index/searchCategory?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response); 
            displayPosts(response); // Call the displayPosts function to render the search results

            btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
            btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });
    });


    //................................. 6. SEARCH AN POST by CATEGORY "Travel with Friends" .................................//
    btn_search_friends.addEventListener('click', function(event) {
        event.preventDefault(); 
        const searchQuery = document.getElementById('btn_search_friends').textContent;
        console.log(searchQuery)

        fetch(`http://localhost:3001/index/searchCategory?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response); 
            displayPosts(response); // Call the displayPosts function to render the search results

            btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
            btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });
    });


    //................................. 7. SEARCH AN POST by CATEGORY "Wildlife & Nature" .................................//
    btn_search_nature.addEventListener('click', function(event) {
        event.preventDefault(); 
        const searchQuery = document.getElementById('btn_search_nature').textContent;
        console.log(searchQuery)

        fetch(`http://localhost:3001/index/searchCategory?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response);
            displayPosts(response); // Call the displayPosts function to render the search results

            btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
            btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
            btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
        })
        .catch(error => {
            console.error('Error loading search results:', error);
            const postsContainer = document.getElementById('posts_container');
            postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
        });
    });

     //................................. 8. SEARCH AN POST by CATEGORY "Beach & Island Getaways" .................................//
     btn_search_getaways.addEventListener('click', function(event) {
         event.preventDefault(); 
         const searchQuery = document.getElementById('btn_search_getaways').textContent;
         console.log(searchQuery)
 
         fetch(`http://localhost:3001/index/searchCategory?query=${encodeURIComponent(searchQuery)}`, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}` 
             }
         })
         .then(response => response.json())
         .then(response => 
         {
             console.log(response); 
             displayPosts(response); // Call the displayPosts function to render the search results
 
             btn_search_all.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
             btn_search_tips.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
             btn_search_adventure.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
             btn_search_solo.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
             btn_search_family.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
             btn_search_friends.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
             btn_search_nature.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill')
             btn_search_getaways.setAttribute('class', 'd-flex py-2 mx-3 bg-light rounded-pill active')
         })
         .catch(error => {
             console.error('Error loading search results:', error);
             const postsContainer = document.getElementById('posts_container');
             postsContainer.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
         });
     });



});











//................................. ADD POST Button .................................//
const add_post_button = document.getElementById('add_post_btn');

add_post_button.addEventListener('click', (event)=>
{    
    event.preventDefault();

    if(localStorage.getItem('token'))
    {
        window.location.href = './addNewPost.html';
    }
    else
    {
        alert('You need to login first!')
    }
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3001/index/popularPosts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('popularPostsContainer');
        postsContainer.innerHTML = data.map(post => `
            <div class="single-recent d-flex pb-3 mb-3">
                <div class="recent-image ratio-container">
                <div class="ratio" style="width: 75px; height: 75px; overflow: hidden; border-radius: 50%; position: relative;">
                    <img src="http://localhost:3001/${post.cover_image}" alt="Null" class="main-post-avatar rounded-circle" style="width: 100%; height: 100%; object-fit: cover; object-position: center;"/>
                </div>
                </div>
                <div class="recent-content">
                    <a href="#">
                        <h6>${post.title}</h6>
                    </a>
                    <p>Likes: ${post.likes_count} | Comments: ${post.comments_count}</p>
                </div>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error loading popular posts:', error);
        const postsContainer = document.getElementById('popularPostsContainer');
        postsContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
    });
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