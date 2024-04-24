const saveBtn = document.getElementById('btn_save')

saveBtn.addEventListener('click', (event)=>
{

    event.preventDefault();
    console.log('Save Button Clicked');


    const formData = new FormData();
    formData.append('title', document.getElementById('titleName').value);
    function getCheckedCategory() {
        const radios = document.querySelectorAll('input[name="flexRadioDefault"]:checked');
        return radios.length > 0 ? radios[0].value : null; // returns the value of the checked radio or null if none are checked
    }
    console.log(getCheckedCategory())

    formData.append('catName', getCheckedCategory()); // instead of 'category'
    formData.append('content', document.getElementById('contentDetails').value);
    

    const fileInput = document.getElementById('formFile');
    if (fileInput.files.length > 0) 
    {
        formData.append('coverpic', fileInput.files[0]);
    } 
    else 
    {
        alert('Please select a file to upload');
        return;
    }
    
    

    fetch('http://localhost:3001/newPost/new/', {
        method: "POST",
        headers: 
        {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: formData

    })
    .then((response)=>
    {
        return response.json;
    })
    .then((response)=>
    {
        console.log('Add Post Successful')
    })
    .catch(error => {
        console.error('Error:', error);
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