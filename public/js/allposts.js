//To Check Whether User Logged in or Not
document.addEventListener('DOMContentLoaded', ()=>{
  if(!localStorage.getItem('token'))
  {
      return alert('Please Log in')
  }
});



fetch('http://localhost:3001/allposts/getAllPosts' ,{
        method: 'GET',
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })

.then((response) =>
{
    return response.json();
})

.then((response)=>
{          
    
  response.forEach(element => {

    console.log(element)

    const posts_container = document.getElementById('posts_container');
    const card = document.createElement('div');
    card.innerHTML = `
    <!--Post Card -->
    <div class="container-fluid" style="max-width: 75%; margin: 20px;">
      <div class="post" style="font-size: 0.9rem; padding: 10px; border: none;">
        <p class="fs-3 text-capitalize" style="font-size: 1.5rem;">${element.title}</p>
        <p class="updatedtime mt-0 ms-3 text-black-50" style="margin-top: 0;">
          <small>Posted on <span>${element.post_date}</span></small>
        </p>
        <img src="${element.cover_image}" class="post-img" alt="" style="max-width: 600px; width: 100%; height: auto;"/>
        <div class="post-body mt-3">
          <p class="post-text pt-3">${element.content}</p>   
          <!-- Likes and Commnet Counts Area -->
          <div class="container" style="padding: 5px;">
            <div>
              <i class="fa-solid fa-heart-circle-plus fa-xl" style="color: #ff4d00;"></i>
              <span class="total-like mt-0">${element.likes_count}</span>
              <i class="fa-solid fa-comment-medical fa-xl" style="color: #00f03c;"></i>
              <span class="total-comments mt-0">${element.comments_count}</span>
              <button class="btn btn-share ms-3 me-4"><img src="./images/postpage/share.png" alt="" /></button> 
            </div> 
            <hr style="max-width: 600px; width: 100%; margin-top: 10px;"> <!-- Reduced margin -->
          </div>
          <!-- End of the post card area -->
        </div> 
      </div>
    </div>
    `
    posts_container.appendChild(card)

      
    });
})








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

