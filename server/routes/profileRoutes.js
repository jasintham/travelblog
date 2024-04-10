// Importing necessary modules.
const express = require('express');
const profileRouter = express.Router();   // Initializing a router object.

const { query } = require('../helpers/db.js'); 
const authenticateToken = require('../middleware/authenticateToken.js');    //Middleware to Verify Token

//................................. ROUTE FOR USER PROFILE SECTION .................................//

// Define a GET route for '/headerdetails' to fetch user details. This route is protected by the authenticateToken middleware.
profileRouter.get('/headerDetails', authenticateToken, async (req, res) => 
{
    try {
        const result = await query('SELECT * FROM users WHERE user_id = $1', [req.user.userId]);    //This userID comes from token's user object
        
        if (result.rows.length > 0)     
        {
            try //Try to catch if there any sytax error of this
            {
                res.json({ 
                    username: result.rows[0].username, 
                    bio: result.rows[0].bio, 
                    profile_picture: result.rows[0].profile_picture,
                    followers_count: result.rows[0].followers_count});    // Send the user's database details as JSON. (This send to Fronend profile.js file)
            }

            catch(error)
            {
                res.status(400).json({message:error.message});
            }
            
        } 
        else 
        {
            res.status(401).json({ message: 'User not found' });    // If no rows are returned, the user does not exist in the database. 
        }
    } 

    catch (error) 
    {
        res.status(402).json({ message: 'Internal server error' });
    }
});



//................................. ROUTE FOR FETCH DETAILS FOR WHOLE TRAVEL STATS SECTION .................................//
profileRouter.get('/travelerStats', authenticateToken, async (req, res) => 
{
    try 
    {
        const result = await query('SELECT * FROM travel_stats WHERE user_id = $1', [req.user.userId]); // Use userID from token's user object
        
        if (result.rows.length > 0) 
        {
            res.json(result.rows[0]);       // Send the user's database details as JSON. (This send to Fronend profile.js file)
        } 

        else 
        {
            res.status(404).json({ message: 'Stats not found' });
        }
    } 
    
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





//................................. ROUTE FOR GET USER DETAILS FOR FORM CONTROL TEXT FEILDS .................................//
profileRouter.get('/getUserDetails', authenticateToken, async (req, res) => 
{
    // Proceed without hashing the password. Note: Storing passwords in plain text is not secure.

    try 
    {
        const resultQuery = await query('SELECT * FROM users WHERE user_id = $1', [req.user.userId] );

        if (resultQuery.rows.length === 0) 
        {
            // User not found in database
            return res.status(401).json({ message: 'User not found.' });
        }

        else
        {
            // Return updated user details (excluding password)
            res.status(200).json(
                {
                    username: resultQuery.rows[0].username,
                    bio: resultQuery.rows[0].bio
                });
        }
        

    } 
    
    catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
});


//................................. ROUTE FOR POST NEW USER DETAILS WHICH FETCH FROM FRONTEND profile.js .................................//
profileRouter.post('/saveNewUserDetails', authenticateToken, async (req, res) => 
{
    
    // Proceed without hashing the password.

    try 
    {
        const result = await query(
            'UPDATE users SET username = $1, password = $2, bio = $3 WHERE user_id = $4 RETURNING username, bio;', // Not returning the password
            [req.body.username, req.body.password, req.body.bio, req.user.userId]
        );

        if (result.rows.length === 0) 
        {
            // User not found in database
            return res.status(404).json({ message: 'User not found.' });
        }

        else
        {
            // Return updated user details (excluding password)
            res.json(result.rows[0]);
        }        

    } 
    
    catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
});







//................................. NOW ROUTES FOR POST(UPDATE) THE Travel Stat SECTION .................................//

//................................. i. ROUTE FOR POST(UPDATE) THE Travel Stat - Countries Visited .................................//
profileRouter.post('/countriesVisited', authenticateToken, async (req, res) => 
{
    // Extract the user ID from the authenticated user's data and the new 'countriesVisited' value from the request body.
    const { userId } = req.user;            // // Extract the user ID from the JWT payload which is in network request header part
    const { countriesVisited } = req.body;  // // Extract the new "countriesVisited" value from network request body part

    // Additional Part: Validate the 'countriesVisited' input to ensure it's a positive number. (For example Countries Visited: -1 is not possible)
    if (!countriesVisited || countriesVisited < 0) 
    {
        return res.status(400).json({ message: 'Invalid input for countries visited.' });
    }

    //Important Part
    try 
    {
        const result = await query(
            'UPDATE travel_stats SET countries_visited = $1 WHERE user_id = $2 RETURNING *;',
            [countriesVisited, userId]  // Substitute $1 and $2 with "countriesVisited" and "userId" values respectively.
        );

        // Additional Part: Check if the query didn't update any rows, possibly because the user ID doesn't exist in "travel_stats".
        if (result.rows.length === 0) {
            // No rows updated, possibly because the user_id doesn't exist in travel_stats
            return res.status(404).json({ message: 'User stats not found.' });
        }

        res.json(result.rows[0]);   // If the update is successful, return the updated record.
    } 
    
    catch (error) 
    {
        console.error('Failed to update countries visited:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//................................. ii. ROUTE FOR POST(UPDATE) THE Travel Stat - Cities Explored .................................//
// Example using Express.js and assuming `query` is a function to execute SQL commands
profileRouter.post('/citiesExplored', authenticateToken, async (req, res) => {
    const { userId } = req.user; // Extract user ID from JWT
    const { citiesExplored } = req.body;

    try 
    {
        // Update the number of cities explored for the user
        const result = await query(
            'UPDATE travel_stats SET cities_explored = $1 WHERE user_id = $2 RETURNING cities_explored;',
            [citiesExplored, userId]
        );

        if (result.rows.length === 0) 
        {
            return res.status(404).json({ message: 'User stats not found.' });
        }

        res.json(result.rows[0]);
    } 
    
    catch (error) {
        console.error('Failed to update cities explored:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//................................. iii. ROUTE FOR POST(UPDATE) THE Travel Stat - Favorite Destination .................................//
// Example using Express.js
profileRouter.post('/favoriteDestination', authenticateToken, async (req, res) => {
    const { userId } = req.user; // Extract user ID from JWT
    const { favoriteDestination } = req.body;

    try {
        // Update favorite destination for the user in the database
        const result = await query(
            'UPDATE travel_stats SET favorite_destination = $1 WHERE user_id = $2 RETURNING favorite_destination;',
            [favoriteDestination, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User stats not found.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to update favorite destination:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





//................................. iv. ROUTE FOR POST(UPDATE) THE Travel Stat - Bucket List .................................//
profileRouter.post('/bucketList', authenticateToken, async (req, res) => {
    const { userId } = req.user; // Extract user ID from JWT
    const { bucketList } = req.body;

    try {
        // Update the bucket list for the user in the database
        const result = await query(
            'UPDATE travel_stats SET bucket_list = $1 WHERE user_id = $2 RETURNING bucket_list;',
            [bucketList, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User stats not found.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to update bucket list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});







//................................. ROUTE FOR RECENT REVIEW SECTION .................................//
/*
.
.
.
.
.
.

*/






// Export the router to make it available for use in other parts of the application, particularly in the main server file (index.js).
module.exports = profileRouter;