document.addEventListener('DOMContentLoaded', function() 
{
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
  .then(response => 
    {
    const postsContainer = document.getElementById('posts_container');
    postsContainer.innerHTML = ''; // Clear any existing content

    response.forEach(postElement => {
      const postCard = document.createElement('div');
      postCard.className = 'container-fluid post-card'; // Added 'post-card' class for styling
      postCard.style.maxWidth = '75%';
      postCard.style.margin = '20px auto';
      postCard.innerHTML = `
        <div class="post" style="font-size: 0.9rem; padding: 10px;">          

          <p class="post-title">${postElement.title}</p>
          <p hidden>${postElement.post_id}</p>

          <p class="updatedtime mt-0 ms-3">
            <small>Posted on ${new Date(postElement.post_date).toLocaleDateString()}</small>
          </p>

          <img src="http://localhost:3001/${postElement.cover_image}" class="post-img" alt="Post Image" style="max-width: 600px; width: 100%; height: auto;">
          
          <div class="post-body mt-3">
            <p class="post-text pt-3">${postElement.content.substring(0, 100)}...</p>     
            <hr>
            <br>
            <div class="blog-icons">

              <div class="icons-left">
                <!-- Like Button with link to specific post page -->
                <button class="btn icon-button" id="btn_like">
                  <i class="fa-regular fa-heart fa-lg"></i> <p class="like-number count-style">${postElement.likes_count}</p>
                </button>
                
                <!-- Comment Button with link to specific post page -->
                <button class="btn icon-button" id="btn_comment">
                <i class="fa-regular fa-comment fa-lg"></i> <p class="comment-number count-style">${postElement.comments_count}</p>
                </button>
              </div>

              <div class="icons-right">
                <!-- Edit Button with link to specific post page -->
                <button class="btn icon-button" id="btn_edit" data-post-id="${postElement.post_id}" data-bs-toggle="modal" data-bs-target="#editPostModal">
                  <i class="fa-regular fa-pen-to-square fa-lg"></i>
                </button>

                <!-- Delete Button with link to specific post page -->
                <button class="btn icon-button" id="btn_delete" data-post-id="${postElement.post_id}">
                  <i class="fa-solid fa-trash-can fa-lg"></i>
                </button>
              </div>

            </div>

            <button class="btn read-more-btn" data-post-id="${postElement.post_id}">Read More</button>

          </div>
        </div>
      `;

      
      

      postsContainer.appendChild(postCard);    

      


      
    });

    
    
    



  })
  
  
  .catch(error => 
    {
    console.error('Error loading posts:', error);
    const postsContainer = document.getElementById('posts_container');
    postsContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
  });
});





// 1. Again fetch all the post data and assign post related value in the modal in the event of clicking edit button
// 2. And also then add event listners to each Read More Button. When user clicks it, user redirect to post.html with post id  
document.addEventListener('DOMContentLoaded',()=>
{
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
  .then(response => 
    {     
      
      // Add event listeners for edit buttons outside of foreach button
      document.querySelectorAll('#btn_edit').forEach(buttonElement => 
        {
          buttonElement.addEventListener('click', function() 
          {
            console.log('Edit button clicked')
            const postId = buttonElement.getAttribute('data-post-id');
            console.log(postId)

            //The find() is an array method returns the value of the first element that passes a test.
            //So when responseElement.post_id is eqal to postId, save it as a variable called post
            const post = response.find(responseElement => responseElement.post_id.toString() === postId);
            console.log(post)
            
            if (post) {
              document.getElementById('postTitle').value = post.title;
              document.getElementById('postContent').value = post.content;
              document.getElementById('postProfilePicture').src = post.cover_image;

              document.getElementById('post-id').textContent = post.post_id;
              // Trigger the modal display if it's not automatically shown by Bootstrap
              //$('#editPostModal').modal('show');
            }
          });
        });

        
      //This connects each Read More button with post.html page
      document.querySelectorAll('.read-more-btn').forEach(buttonElement => 
        {
          buttonElement.addEventListener('click', () =>
          {
            console.log('Read More Button Clicked')
            const postId = buttonElement.getAttribute('data-post-id');
            window.location.href = `post.html?postId=${postId}`;
          });
        });  

        //This connects each Delete button with database
        document.querySelectorAll('#btn_delete').forEach(buttonElement => 
          {
            buttonElement.addEventListener('click', () =>
            {
              console.log('Delete button clicked');
              const postId = buttonElement.getAttribute('data-post-id');
              console.log(postId)

              const requestPayLoad = JSON.stringify({post_id:postId});

              fetch('http://localhost:3001/allposts/deletePost/', 
              {
                method: 'DELETE',
                headers: 
                {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: requestPayLoad
                })
                .then(response => 
                {                  
                  return response.json();
                })
                .then((response)=>
                {
                  console.log(`Delete Succussful ${response.post_id}`)
                  location.reload(); // Optional: reload page to see updated post
                })

            });
          }); 
        
    })  

        
        
        

})




// When user click on save button of each post modal, the new values save in the database
document.addEventListener('DOMContentLoaded', ()=>
{
  document.getElementById('savePostForm').addEventListener('click', function(event) 
  {
    event.preventDefault();
    console.log('Save Post Button Clicked')


    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const cover_image = document.getElementById('postProfilePicture').src;
    const post_id = document.getElementById('post-id').textContent;

    console.log(post_id)

    fetch('http://localhost:3001/allposts/updatePost/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({
            title: title,            
            content: content,
            cover_image: cover_image,
            post_id: post_id
        })
    })
    .then(response => 
    {
      if (!response.ok) 
      {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => 
    {
      console.log('Success:', data);
      // Hide the modal using Bootstrap's JavaScript method
      const modalElement = document.getElementById('editPostModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide(); // Hide the modal

      location.reload(); // Optional: reload page to see updated post
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  });

});

//