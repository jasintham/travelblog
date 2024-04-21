// Importing necessary modules.
const express = require('express');
const loginRouter = express.Router();   // Initializing a router object.

const { query } = require('../helpers/db.js'); 

const jwt = require('jsonwebtoken');    //To create the token




// To get user details
loginRouter.post('/', async (req, res) => {
    try 
    {
        const checkUser = await query('SELECT * FROM users WHERE username = $1', [req.body.username])
        if (checkUser.rows.length ==0)
        {
            res.status(400).json({message:'Not an exising user. Please Register'})
        }
        else
        {
            const resultQuery = await query('SELECT * FROM users WHERE username = $1 AND password = $2', [req.body.username, req.body.password]);   
        
            if (resultQuery.rows.length ==0)
            {
                res.status(401).json({message:'Password Does Not Match'})
            }
    
            else
            {
                //Generate a JWT when the user successfully logs 
                const token = jwt.sign(
                    { userId: resultQuery.rows[0].user_id }, 
                    process.env.JWT_SECRET, // Replace 'your_secret_key' with a real secret key stored in .env file
                    { expiresIn: '8h' } // Token expires in 1 hour
                );    
    
                // Response is....
                res.status(200).json(
                    {   message: 'Login successful',
                        token,
                        userDetails: resultQuery.rows[0]});            
            }
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