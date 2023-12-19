const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather app',
        name: 'Benjamin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Benjamin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome to our support page',
        msg: 'If you have any question, contact us at support.cheaper.shop',
        name: 'Benjamin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Address is required.'
        })
    }
    forecast.forecast(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error,
            })
        }
        res.send({
            address: req.query.address,
            forecast: data
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        msg: 'Help article not found.',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        msg: 'Page not found.',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})