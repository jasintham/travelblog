# Project Setup Instructions
Follow these steps to set up the project and start developing your features. Ensure that each step is completed before moving on to the next to avoid configuration issues.


## 1. Install Dependencies
Run the `npm install` command in server folder to install the necessary dependencies.

## 2. Database Creation
Refer to the `db.sql` file located in the server folder to create your database. Use the provided queries as guidelines without alterations.

## 3. Insert Data
While you may input your own values for the INSERT commands, ensure that you do not modify the CREATE TABLE statements or their associated field values.

## 4. Environment Configuration
Create a `.env` file in the server folder and configure your database details according to the provided `.env.template` example. This includes setting your database password and other connection details.

## 95. Starting the Server
In the server folder, open a terminal in VS Code and run the `npm run devStart` command to start the server.

## 6. User Authentication
To log in, open `login.html` from the root folder, and enter a username and password that match the credentials in your database's users table. A successful login redirects you to `profile.html`.

## 7. Navigation
Use the navigation bar at the top of the pages to redirect to different pages of the application.

## 8. Page and Route Development
For developing your own pages (e.g., `post.html` and `post.js`), define corresponding routes in the `index.js` file within the server folder. Additionally, create route handlers in the server/routes folder (e.g., `postRoutes.js`).

## 9. Database Updates for New Tables
Important: If you create additional tables for new pages, please remember to update the `db.sql` file with the new SQL queries to reflect these changes.