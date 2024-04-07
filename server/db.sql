-- ****** Create a Database with this name: travelBlog ******
-- CREATE DATABASE travelBlog;


-- ............................................. USERS TABLE .............................................

-- users Table (For Login and Registration)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_picture TEXT
);

-- Insert some sample users
INSERT INTO users (username, password, bio, profile_picture) 
VALUES ('123', '123', 'My name is 123', 'default-profile.jpg');
INSERT INTO users (username, password, bio, profile_picture) 
VALUES ('RyanWick1', '123', 'Hey there, I''m from Sri Lanka.', 'default-profile.jpg');

SELECT * FROM users;


-- ............................................. TRAVEL STATS TABLE .............................................

-- travel_stats Table (For Profile)
CREATE TABLE travel_stats (
    user_id INT PRIMARY KEY,
    countries_visited INT,
    cities_explored INT,
    favorite_destination VARCHAR(255),
    bucket_list TEXT, -- Assuming this might be a longer list, TEXT is chosen
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO travel_stats (user_id, countries_visited, cities_explored, favorite_destination, bucket_list)
VALUES (1, 10, 25, 'Japan', 'Visit the Pyramids of Egypt, Explore the Amazon Rainforest');
INSERT INTO travel_stats (user_id, countries_visited, cities_explored, favorite_destination, bucket_list)
VALUES (2, 2, 2, 'SL', 'Play Games');

SELECT * FROM travel_stats;



-- ............................................. POSTS TABLE .............................................

-- Posts Table (Includes Categories as a field)
CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    post_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cover_image TEXT
);

-- Insert some sample posts
-- Note: You should adjust these values according to your actual users' IDs and desired content.
INSERT INTO posts (user_id, category_name, title, content, cover_image) VALUES
(1, 'Travel', 'My Journey to Japan', 'It was a fantastic experience!', 'path/to/image1.jpg'),
(2, 'Adventure', 'Climbing in Sri Lanka', 'Climbing Adam''s Peak was breathtaking.', 'path/to/image2.jpg');


-- ............................................. COMMENTS TABLE .............................................

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    comment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ............................................. LIKES TABLE .............................................

-- Likes Table
CREATE TABLE IF NOT EXISTS likes (
    like_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    like_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);





-- Example of how to query joined data
-- This will get all posts along with their user's username and profile picture.
SELECT p.post_id, p.title, p.content, p.post_date, p.cover_image, u.username, u.profile_picture
FROM posts p
JOIN users u ON p.user_id = u.user_id;