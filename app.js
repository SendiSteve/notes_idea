const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

const app = express()

// connect to the database
mongoose.connect('mongodb://localhost:27017/notesIdea', {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

// Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// load static files
app.use(express.static('public'))
app.use(express.static('files'))

app.use('/static', express.static(path.join(__dirname, 'public')))

// Load models
require('./models/Note');


// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Use routes
app.use('/users', users);

const port = 9000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});