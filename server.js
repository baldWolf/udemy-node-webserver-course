// nodemon server.js -e js,bhs

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance',
        maintenanceMessage: 'Sorry, we are in maintenance mode.'
        //currentYear: new Date().getFullYear()
    });
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// req - request
// res - response
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'This is a test!',
    //     likes: [
    //         'Normal',
    //         'Heart'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome!'
        //currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About'
        //currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res)=> {
    res.send( {
        errorMessage: 'Bad request'
    });
})

app.listen(port, ()=> {
    console.log(`Server is up for port ${port}`);
});