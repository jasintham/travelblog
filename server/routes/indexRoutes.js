// Importing necessary modules.
const express = require('express');
const indexRouter = express.Router();   // Initializing a router object.

const { query } = require('../helpers/db.js'); 
const authenticateToken = require('../middleware/authenticateToken.js');    //Middleware to Verify Token


// Endpoint to get posts
indexRouter.get('/allPosts', authenticateToken ,async (req, res) => {
    try 
    {
        const result = await query('SELECT post_id, title, content, cover_image FROM posts');
        res.json(result.rows);
    } 
    catch (error) 
    {
        res.status(500).send('Server error');
    }
});

module.exports = indexRouter;
