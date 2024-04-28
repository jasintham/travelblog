document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('btn_save');
    const clearBtn = document.getElementById('clear_btn');

    // Setup click event for the photo upload button
    const photoUploadBtn = document.querySelector('.photo-upload-btn');
    photoUploadBtn.addEventListener('click', function() {
        document.getElementById('profilePicUpload').click();
    });

    // Update the filename display when a file is chosen
    document.getElementById('profilePicUpload').addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
        document.getElementById('file-chosen').textContent = fileName;
    });

    // Setup the save button click event
    saveBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Save Button Clicked');

        const formData = new FormData();
        formData.append('title', document.getElementById('titleName').value);

        function getCheckedCategory() {
            const radios = document.querySelectorAll('input[name="flexRadioDefault"]:checked');
            return radios.length > 0 ? radios[0].value : null;
        }
        console.log(getCheckedCategory());

        formData.append('catName', getCheckedCategory());
        formData.append('content', document.getElementById('contentDetails').value);

        const fileInput = document.getElementById('profilePicUpload');
        if (fileInput.files.length > 0) {
            formData.append('coverpic', fileInput.files[0]);
        } else {
            alert('Please select a file to upload');
            return;
        }

        fetch('http://localhost:3001/newPost/new/', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            console.log('Add Post Successful', response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Setup the clear button click event
    clearBtn.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('titleName').value = '';
        document.getElementById('contentDetails').value = '';
        const radios = document.querySelectorAll('input[name="flexRadioDefault"]');
        radios.forEach(radio => radio.checked = false);
        document.getElementById('profilePicUpload').value = '';  // Reset file input
        document.getElementById('file-chosen').textContent = 'No file chosen';  // Reset file label
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






