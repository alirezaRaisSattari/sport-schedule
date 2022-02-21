const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

router.get('', (req, res) => {
    res.render('index', {
        title: 'Your Lists',
        name: 'alireza'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'alireza'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'alireza'
    })
})

router.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

router.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

router.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'alireza',
        errorMessage: 'Help article not found.'
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'alireza',
        errorMessage: 'Page not found.'
    })
})

module.exports = router