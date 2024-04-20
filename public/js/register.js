const register_button = document.getElementById('register_btn');

register_button.addEventListener('click', function(event) {
    console.log('Signup submission button clicked'); // For debugging purposes to confirm the button click event is captured.
    
    event.preventDefault(); //This line prevents the default action of the click event, which in this case would be to submit a form or refresh the page.

    // Retrieve the values entered in the username and password fields by the user.
    const input_username = document.getElementById('username').value;
    const input_password = document.getElementById('password').value;
    const confirm_password  = document.getElementById('confirm_password').value;
    
    if (input_password !== confirm_password)
    {
        return alert('Passowrds are not matching')
    }

    if (input_password=='' || confirm_password =='')
    {
        return alert('Password Fields cannot be empty')
    }

    else
    {
        const reqPayLoad = JSON.stringify({username:input_username , password: input_password});
        
      
        try
        {   
            //Sending the request to the backend



            fetch('http://localhost:3001/register/', { 
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: reqPayLoad
            })

            .then((response) =>
            {
                if(response.ok) //This line checks if the response status is within the success range (200-299). If it is, it parses the response body as JSON and returns it.
                {
                    return response.json();
                }
            })

            .then((response)=> //This line sets up another .then() block to handle the parsed JSON response from the server.
            {
                console.log('Signup Successful');

                window.location.href = '/public/login.html';
                
            })

        }
        
        catch(error)
        {
            console.log(error);
        }
    }
    

    
});
