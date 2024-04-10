// This file defines the Users class, which manages user-related operations such as authentication. 
import { User } from "./User.js";       // Import the User class to here.




// Define the Users class for handling operations like authentication.
class Users {
    
    #backend_url = '';

    // Constructor takes backend URL as an argument
    constructor(url) 
    {
        this.#backend_url = url;
    }

    // authenticate method takes username and password, returns a Promise resolving to a User object or rejecting with an error.
    authenticate(username, password) 
    {
        return new Promise((resolve, reject) => 
        {
            
            const requestPayload = JSON.stringify({ username, password });  // Convert the username and password into a JSON string for the request body.
            
            // Make a POST request to the backend 
            fetch(`${this.#backend_url}/login/`,   
            {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: requestPayload 
            })
            
            
            .then(response => response.json()) 
            

            .then(data => {
                if (data.login==true)  
                {
                    // If login is successful, instantiate a new User with details from the response.
                    const user = new User(data.username, data.bio, data.profile_picture);

                    user.setToken(data.token); // Set the token that we receive from the login response

                    resolve(user);  
                } 
                
                else 
                {
                    // If login failed (e.g., incorrect credentials), reject the promise with an error message.
                    reject(new Error(data.message));
                }
            })

            .catch(error => reject(error)); // Catch and reject the promise on network errors or issues with the fetch request.

        });
    }
}

// Export the Users class so it can be imported and utilized in other parts of the application.
export { Users };
