// Importing necessary modules.
const express = require('express');
const indexRouter = express.Router();   // Initializing a router object.

const { query } = require('../helpers/db.js'); 
const authenticateToken = require('../middleware/authenticateToken.js');    //Middleware to Verify Token


// Endpoint to get posts
indexRouter.get('/allPosts', authenticateToken ,async (req, res) => {
    try 
    {
        const result = await query(`
        SELECT
            p.post_id,
            p.title,
            p.content,
            p.post_date,
            p.cover_image,
            p.category_name,
            u.username,
            u.profile_picture,
            (SELECT COUNT(likes.like_id) FROM likes WHERE likes.post_id = p.post_id) AS likes_count,
            (SELECT COUNT(*) FROM comments WHERE post_id = p.post_id) AS comments_count
        FROM 
            posts p
        JOIN
            users u ON p.user_id = u.user_id
        GROUP BY
            p.post_id, u.username, u.profile_picture
        ORDER BY 
            p.post_date DESC
        `);
        res.json(result.rows);
    } 
    catch (error) 
    {
        res.status(500).send('Server error');
    }
});


// Endpoint to search posts
indexRouter.get('/search', authenticateToken ,async (req, res) => 
{
    const searchQuery = req.query.query; // Retrieve the 'query' parameter from the URL
    if (!searchQuery) {
        return res.status(400).json({ error: 'No search term provided' });
    }

    try 
    {
        const results = await query(
            "SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1",
            [`%${searchQuery}%`] // Use placeholders to prevent SQL injection
        );
        res.json(results.rows);
    } 
    catch (error) 
    {
        console.error('Search Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to search posts by category name
indexRouter.get('/searchCategory', async (req, res) => 
{
    const searchQuery = req.query.query; // Retrieve the 'query' parameter from the URL
    if (!searchQuery) 
    {
        return res.status(400).json({ error: 'No search term provided' });
    }

    try 
    {
        const results = await query(
            "SELECT * FROM posts WHERE category_name ILIKE $1",
            [`%${searchQuery}%`] // Use placeholders to prevent SQL injection
        );
        res.json(results.rows);
    } 
    catch (error) 
    {
        console.error('Search Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});










module.exports = indexRouter;
