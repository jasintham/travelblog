require('dotenv').config({ path: './config/.env' });
//imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());
const port = process.env.PORT;

//Static Pages
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));



app.get("/",(req, res) => {
   // res.status(200).json({resul:'sucess'})
   res.render('home')
});

app.listen(port)