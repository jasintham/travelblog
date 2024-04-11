// Importing necessary modules.
const express = require('express');
const loginRouter = express.Router();   // Initializing a router object.

const { query } = require('../helpers/db.js'); 

const jwt = require('jsonwebtoken');




// Define a POST route for '/login' to handle user login requests.
loginRouter.post('/', async (req, res) => {
    try 
    {
        
        const resultQuery = await query('SELECT * FROM users WHERE username = $1', [req.body.username]);        

        
        if (resultQuery.rows.length > 0)     // If the query returns at least one row
        {                     
    
            // Check if the provided password matches the one stored in the database.
            if (resultQuery.rows[0].password === req.body.password) 
            {

                //Generate a JWT when the user successfully logs 
                //This user object is then ENCODED into a JWT token using jwt.sign(). This will DECODED in server/middleware/authenticateToken.js
                const token = jwt.sign(
                    { userId: resultQuery.rows[0].user_id }, // Ensure this matches the database field
                    process.env.JWT_SECRET, // Replace 'your_secret_key' with a real secret key stored in .env file
                    { expiresIn: '1h' } // Options: Token expires in 1 hour
                );    
                

                // Response is....
                res.status(200).json({
                    login: true,
                    message: 'Login successful',
                    token,
                    username: resultQuery.rows[0].username, 
                    bio: resultQuery.rows[0].bio, 
                    profile_picture: resultQuery.rows[0].profile_picture});
            } 
            
            else 
            {
                // If they don't match, send a response indicating the password is incorrect.
                res.status(200).json({ 
                    login: false, 
                    message: 'Invalid username or password'});
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
        // If an error occurs if try block 
        res.status(500).json({ message: error.message });
    }
});





// Export 'loginRouter' so it can be imported and used in 'index.js' to define application routes.
module.exports = loginRouter;