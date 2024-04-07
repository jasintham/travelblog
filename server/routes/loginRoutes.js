// Importing necessary modules: 'express' for routing and our custom 'db.js' for database operations.
const express = require('express');
const { query } = require('../helpers/db.js'); 

// Initializing a router to define routes related to user authentication.
const router = express.Router();


const jwt = require('jsonwebtoken');




// Define a POST route for '/login' to handle user login requests.
router.post('/login', async (req, res) => {
    try 
    {
        // Extract 'username' and 'password' from the request body. Request body comes from FronEnd login.js ->Users.js-> authenticate() method).
        const { username, password } = req.body;     

        
        // Execute a database query to find a user by 'username'. '$1' is replaced by 'username' to prevent SQL injection.
        const result = await query('SELECT * FROM users WHERE username = $1', [username]);        

        
        if (result.rows.length > 0)     // If the query returns at least one row, it means a user with the provided username exists.
        {
            // Assigning the first result row to 'user'.
            const user = result.rows[0];           
    
            // Check if the provided password matches the one stored in the database.
            if (user.password === password) 
            {

                //Generate a JWT when the user successfully logs 
                //This user object is then ENCODED into a JWT token using jwt.sign(). This will DECODED in server/middleware/authenticateToken.js
                const token = jwt.sign(
                    { userId: user.user_id }, // Ensure this matches the database field
                    process.env.JWT_SECRET, // Replace 'your_secret_key' with a real secret key stored in .env file
                    { expiresIn: '1h' } // Options: Token expires in 1 hour
                );    
                

                // If user.password === password match, send a response indicating successful login.
                res.status(200).json({
                    login: true,
                    message: 'Login successful',
                    token,
                    username: user.username, 
                    bio: user.bio, 
                    profile_picture: user.profile_picture
                });
            } 
            
            else 
            {
                // If they don't match, send a response indicating the password is incorrect.
                res.status(200).json({ login: false, message: 'Invalid username or password' });
            }
        } 
        
        else 
        {
            // If no users were found with the provided username, inform the client.
            res.status(200).json({ login: false, message: 'User not found' });
        }
    } 
    
    catch (error) 
    {
        // If an error occurs during the process, log it and inform the client.
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});





// Export 'router' so it can be imported and used in 'index.js' to define application routes.
module.exports = router;
