// Import required modules and middleware
const express = require('express'); // Import the Express framework to simplify server creation
const cors = require('cors'); // Import CORS to allow cross-origin requests
require('dotenv').config(); // Import and configure dotenv to load environment variables from .env file

// Import route handlers
const loginRouter = require('./routes/loginRoutes.js'); // Import routes for authentication-related endpoints
const profileRouter = require('./routes/profileRoutes.js'); // Import routes for user-related endpoints



// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes to handle requests from different origins
app.use(express.json()); // Enable parsing of JSON request bodies



// Routes setup
app.use('/login', loginRouter); // Recieve requests from login.js
app.use('/profile', profileRouter); // Recieve requests from profile,js


// Static file serving (optional)
// Serve static files (e.g., HTML, CSS, JS) from the 'public' directory, making them accessible via the root path
app.use(express.static('public'));

// Start the server
// Determine the port to listen on from environment variables or use 3001 as a default
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log server start message indicating successful launch and listening port
});
