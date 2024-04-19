// Create a router
const express = require("express");

const allpostsRouter = express.Router();// Instantiate a new router
const { query } = require("../helpers/db.js"); //Import database helper

const authenticateToken = require('../middleware/authenticateToken.js'); // Import authentication middleware

// Route to get all posts
allpostsRouter.get("/getAllPosts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Query the database to get all posts
    const result = await query(`
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
        p.user_id = $1
        ORDER BY 
        p.post_date DESC
        `, [userId]);

    // Send the retrieved posts as JSON response
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define Route to GET likes count
allpostsRouter.post('/getLikesCount', authenticateToken, async (req, res) => {
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

// Define Route to GET comments count
allpostsRouter.post('/getCommentsCount', authenticateToken, async (req, res) => {
  try 
  {        
      const resultQuery = await query(`
      SELECT
          post_id,
          COUNT(comment_id) AS comment_count
      FROM
          comments c
      WHERE
          post_id = $1
      GROUP BY
          post_id;`, [req.body.postId]);

      if (resultQuery.rows.length > 0) {
          res.json(resultQuery.rows[0]);
      } else {
          res.status(404).json({ message: 'Comment count not found' });
      }
  } catch (error) {
      console.error('Error accessing the database:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all posts with pagination
allpostsRouter.get("/getPageData", async (req, res) => {
  try {
    // Retrieve page number from query parameters, default to page 1 if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; //Define number of posts per page
    const offset = (page - 1) * limit; //Calculate offset based on page number

    // Query the database to get postes for the requested page
    const result = await query(
      `
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
        ORDER BY 
        p.post_date DESC
        LIMIT $1 OFFSET $2;
        `,
      [limit, offset]
    );

    // Send the retrieved posts a JSON response
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the postRouter object
module.exports = allpostsRouter;
