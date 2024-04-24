const saveBtn = document.getElementById('btn_save')

saveBtn.addEventListener('click', (event)=>
{

    event.preventDefault();
    console.log('Save Button Clicked');
    // Function to get the value of the checked radio button
    function getCheckedCategory() {
        const radios = document.querySelectorAll('input[name="flexRadioDefault"]:checked');
        return radios.length > 0 ? radios[0].value : null; // returns the value of the checked radio or null if none are checked
    }
    console.log(getCheckedCategory())
    
    const requestPayLoad = JSON.stringify(
        {
            title: document.getElementById('titleName').value,
            catName: getCheckedCategory(), // Use the function to get the checked category
            content: document.getElementById('contentDetails').value,
            coverpic: "/public/images/post/post_2.jpg"
        })

    fetch('http://localhost:3001/newPost/new/', {
        method: "POST",
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: requestPayLoad

    })
    .then((response)=>
    {
        return response.json;
    })
    .then((response)=>
    {
        console.log('Add Post Successful')
    })

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