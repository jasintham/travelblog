//To Check Whether User Logged in or Not
document.addEventListener('DOMContentLoaded', ()=>{
    if(!localStorage.getItem('token'))
    {
        return alert('Please Log in')
    }
});


const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');
console.log(postId); // Use this postId to fetch or display more details


const reqPayLoad = JSON.stringify({postId:postId})

// ------------------------------------ To Get Post Data ------------------------------------
fetch('http://localhost:3001/post/getPostData' ,{
    method: 'POST',
    headers : {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body : reqPayLoad
})

.then((response) =>
{
    return response.json();
})

.then((response)=>
{
    //Set Post Title
    const post_title = document.getElementById('post_title');
    post_title.textContent = response.title;

    //Set Post Content
    const post_content = document.getElementById('post_content');
    post_content.textContent = response.content;

    //Set Post Date
    const post_date = document.getElementById('post_date');
    post_date.textContent = response.post_date;

    //Set Post author
    const post_author = document.getElementById('author_name');
    post_author.textContent = response.username;



})


// ------------------------------------ To Get Comment Data ------------------------------------
function loadAllComments()
{
    const comment_section = document.getElementById('post_comments');
    comment_section.innerHTML = ''; // Clear existing comments

    fetch('http://localhost:3001/post/getCommentData' ,{
        method: 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body : reqPayLoad
    })

    .then((response) =>
    {
        return response.json();
    })

    .then((response)=>
    {
        console.log(response);

        response.forEach(element => 
        {
            const comment_section = document.getElementById('post_comments');
            const comment = document.createElement('div');
            comment.innerHTML = `
            <div class="card-body p-4">                
                <div class="d-flex flex-start">
                <img class="rounded-circle shadow-1-strong me-3"
                    src="./images/post/post_4.jpg" alt="avatar" width="60" height="60" />
                    <div>
                        <h6 class="fw-bold mb-1">${element.username}</h6>

                        <div class="d-flex align-items-center mb-3">
                            <p class="mb-0">
                                ${element.comment_date}
                            </p>
                        </div>

                        <p class="mb-0">${element.comment_text}</p>
                    </div>
                </div>
            </div>
            
            <hr class="my-0" />`
            comment_section.append(comment);
        });
    })
}

document.addEventListener('DOMContentLoaded', ()=>
{
    loadAllComments();  // Call this function after DOM is fully loaded
});


// ------------------------------------ To Get Likes and Comments Count ------------------------------------
fetch('http://localhost:3001/post/getLikesCount' ,{
    method: 'POST',
    headers : {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body : reqPayLoad
})

.then((response) =>
{
    return response.json();
})

.then((response)=>
{
    console.log(response);

    const likeCount = document.getElementById('like_count');
    likeCount.textContent = response.likes_count;

    const commentCount = document.getElementById('comment_count');
    commentCount.textContent = response.comments_count;


}) 

    


// ------------------------------------ To Make a Comment ------------------------------------
    
const commentButton = document.getElementById('comment_btn');
commentButton.addEventListener('click', (event)=>
{  
    event.preventDefault();       
    console.log('Comment Button Clicked!');

    const commentText = document.getElementById('comment_area').value;    

    fetch('http://localhost:3001/post/makeComment' ,{
        method: 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body : JSON.stringify({postId:postId, comment:commentText})
    })

    .then((response) =>
    {
        return response.json();
    })

    .then((response)=>
    {
        console.log(response);
        document.getElementById('comment_area').value = '';  
        loadAllComments();
        
    })
    .catch((error) => {
        console.error('Failed to post comment:', error);
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