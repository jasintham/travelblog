//To Check Whether User Logged in or Not
document.addEventListener('DOMContentLoaded', ()=>{
    if(!localStorage.getItem('token'))
    {
        return alert('Please Log in')
    }
});


const contact_btn = document.getElementById('contact_btn');

contact_btn.addEventListener('click', function(event) {
    console.log('Button clicked'); // For debugging to confirm the button click event is captured

    event.preventDefault();

    // Retrieve the values entered in the name,contact number,email address and message fields by the user.(can be a registered user or other user)
    const name1 = document.getElementById('fullname').value;
    const contactnumber1 = document.getElementById('contactnumber').value;
    const emailaddress1 = document.getElementById('email').value;
    const message1 = document.getElementById('message').value;

    const reqPayLoad = JSON.stringify({fullname:name1 , contactnumber:contactnumber1 , email:emailaddress1 , message: message1});

    try
    {
        // sending the request to the backend
        fetch('http://localhost:3001/contactus/contactus/', {
            method: 'POST' ,
            headers: {
                'Content-Type' :'application/json'
            },
            body: reqPayLoad
        })

        .then((response) =>
    {
        if(response.ok)
        {
            return response.json();
        }
    })

    .then((response)=>
{
    alert('Message sent Successfully');

    localStorage.setItem('token', response.token); // Set token in the cache

    window.location.href = '/public/index.html';
})
    }

    catch(error)
    {
        console.log(error);
    }
    
    
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