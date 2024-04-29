const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');
console.log(postId); // Use this postId to fetch or display more details




document.getElementById('btn_save').addEventListener('click', function(event) 
{
    event.preventDefault();
    
    const reqPayLoad = JSON.stringify(
        {
            postId: postId, 
            reportReason: document.getElementById('reportDetails').value
        })

    console.log(reqPayLoad);

    if(!localStorage.getItem('token'))
    {
        alert('You have to create an account to be able to report!')
    }

    else
    {
        // Implement fetch to send data to backend
        fetch('http://localhost:3001/reportus/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Assuming JWT for auth
            },
            body: reqPayLoad
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log('Report submitted:', response);
            alert('Thank you for your report.');
            //window.location.href = 'index.html'; // or any other redirection
        })
        .catch(error => 
        {
            console.error('Error submitting report:', error);
            alert('There was a problem submitting your report.');
        });
    }

    
});



if (postId) {
    fetch(`http://localhost:3001/reportus/details/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('postPreview').style.display = 'block';
        document.getElementById('postImage').src = `http://localhost:3001/${data.cover_image}`;
        document.getElementById('postTitle').textContent = data.title;
        document.getElementById('postContent').textContent = data.content;
        document.getElementById('postId').value = postId;
    })
    .catch(error => console.error('Error fetching post details:', error));
}


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
    localStorage.clear();
    window.location.href = 'index.html'
});