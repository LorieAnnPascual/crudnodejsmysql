const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Lacuna0228.!',
    database: 'products',
    multipleStatements: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//insert data
app.post('/add', function(req, res) {
    db.query('INSERT INTO product_info(product_ID, artist_name, song_title, category) values(?, ?, ?, ?)',
    [req.body.product_ID, req.body.artist_name, req.body.song_title, req.body.category],
    function(err) {
        if(err) return console.log(err.message);
        else console.log('New product has been added');
        res.send(`New product has been added to the database with id ${req.body.product_ID} and artist name ${req.body.artist_name}`);
    })
})

// get all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM product_info', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//get specific product
app.get('/products/:id', (req, res) => {
    db.query('SELECT * FROM product_info WHERE product_ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//update data
app.put('/add', function(req, res) {
    db.query('INSERT INTO product_info(product_ID, artist_name, song_title, category) values(?, ?, ?, ?)',
    [req.body.product_ID, req.body.artist_name, req.body.song_title, req.body.category],
    function(err) {
        if(err) return console.log(err.message);
        else res.send('Updated Successfully');
    })
});

//delete data
app.delete('/products/:id', (req, res) => {
    db.query('DELETE FROM product_info WHERE product_ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

app.listen(port, () => {
    console.log('Server started at port: ' + port);
    //checking if db is connected
    db.connect((err) => {
        if(err) console.log("Error " + err.message);
        else console.log("DB connected");
    })
});