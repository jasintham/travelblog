// Create a router
const express = require("express");

const allpostsRouter = express.Router(); // Instantiate a new router
const { query } = require("../helpers/db.js"); //Import database helper

const authenticateToken = require("../middleware/authenticateToken.js"); // Import authentication middleware

// Route to get all posts
allpostsRouter.get("/getAllPosts/", authenticateToken, async (req, res) => {
  try {
    // Query the database to get all posts
    const result = await query(
      `
    SELECT
    p.post_id,
    p.title,
    p.content,
    p.post_date,
    p.cover_image,
    u.username,
    u.profile_picture,
    (SELECT COUNT(likes.like_id) FROM likes WHERE likes.post_id = p.post_id) AS likes_count,
    (SELECT COUNT(*) FROM comments WHERE post_id = p.post_id) AS comments_count
  FROM 
    posts p
  JOIN
    users u ON p.user_id = u.user_id
  WHERE
    p.user_id = $1
  GROUP BY
      p.post_id, u.username, u.profile_picture
  ORDER BY 
    p.post_date DESC
        `,
      [req.user.userId]
    );

    // Send the retrieved posts as JSON response
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the postRouter object
module.exports = allpostsRouter;
