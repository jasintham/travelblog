// Create a router
const express = require('express');
const postRouter = express.Router();

const { query } = require('../helpers/db.js'); // Import database helper
const authenticateToken = require('../middleware/authenticateToken.js'); // Middleware to verify token

// Define Route to GET all post data
postRouter.post('/getPostData', authenticateToken, async (req, res) => {
    try 
    {        
        const resultQuery = await query(`
        SELECT 
        p.post_id,
        p.title,
        p.content,
        p.post_date,
        p.cover_image,
        u.username,
        u.profile_picture
        FROM 
            posts p
        JOIN 
            users u ON p.user_id = u.user_id
        WHERE 
            p.post_id = $1
        GROUP BY
            p.post_id, p.title, p.content, p.post_date, p.cover_image, u.username, u.profile_picture
        ORDER BY
            p.post_date DESC;`, [req.body.postId]);

        if (resultQuery.rows.length > 0) {
            res.json(resultQuery.rows[0]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error accessing the database:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Define Route to GET all comment data
postRouter.post('/getCommentData', authenticateToken, async (req, res) => {
    try 
    {        
        const resultQuery = await query(`
        SELECT
            c.comment_id,
            c.post_id,
            c.user_id,
            u.username,
            c.comment_date,
            c.comment_text
        FROM
            comments c
        JOIN
            users u ON c.user_id = u.user_id
        WHERE 
            post_id = $1
        ORDER BY
            c.comment_date DESC;`, [req.body.postId]);

        if (resultQuery.rows.length > 0) {
            res.json(resultQuery.rows);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error accessing the database:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Define Route to GET likes count
postRouter.post('/getLikesCount', authenticateToken, async (req, res) => {
    try 
    {        
        const resultQuery = await query(`
        SELECT
            post_id,
            COUNT(like_id) AS like_count
        FROM
            likes
        WHERE
            post_id = $1
        GROUP BY
            post_id;`, [req.body.postId]);

        if (resultQuery.rows.length > 0) {
            res.json(resultQuery.rows[0]);
        } else {
            res.status(404).json({ message: 'Like count not found' });
        }
    } catch (error) {
        console.error('Error accessing the database:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = postRouter; // Export the postRouter object
