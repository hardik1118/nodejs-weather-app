const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/weather');

const app = express();

// define paths for express app
const staticDirPath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialpath);

// setting static files directory path
app.use(express.static(staticDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Krishna'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Krishna'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Krishna'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a location!'
        });
    }

    weather(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            });
        }

        return res.send({
            location: data.location.name,
            region: data.location.region,
            country: data.location.country,
            temperature: data.current.temperature,
        });
    })
})

app.get('*', (req, res) => {
    res.render('404_page', {
        name: 'hardik Gandhi',
        title: '404 Page',
        message: 'Requested page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on 3000');
});