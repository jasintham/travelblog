const login_btn = document.getElementById('login_btn');

login_btn.addEventListener('click', function(event) {
    console.log('Button clicked'); // For debugging purposes to confirm the button click event is captured.
    
    event.preventDefault(); 

    // Retrieve the values entered in the username and password fields by the user.
    const username1 = document.getElementById('username').value;
    const password1 = document.getElementById('password').value;

    const reqPayLoad = JSON.stringify({username:username1 , password: password1});
    
    try
    {   
        //Sending the request to the backend
        fetch('http://localhost:3001/login/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: reqPayLoad
        })

        .then((response) =>
        {
            return response.json();
        })

        .then((response)=>
        {           

            if(response.message == 'Login successful')
            {
                localStorage.setItem('token', response.token);  //Set token in the cache

                window.location.href = '/public/profile.html';
            }

            else
            {
                alert(response.message);
            }


        })

    }
    
    catch(error)
    {
        console.log(error);
    }

    
});


//Register Button Event Handling
const register_button = document.getElementById('register_btn');

register_button.addEventListener('click', ()=>
{
    window.location.href = './register.html'
})
