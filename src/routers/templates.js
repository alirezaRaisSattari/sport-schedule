const express = require('express')
const router = new express.Router()

const name = 'alireza rais sattari'
const icon = '/img/icon.png'

router.get('', (req, res) => {
    res.render('index', {
        title: 'مخاطبین',
        name,
        icon
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'درباره من',
        name,
        icon
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'راهنما',
        name,
        icon
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'ثبت نام',
        name,
        icon
    })
})

router.get('/workouts/*/*/print', (req, res) => {
    res.render('print', {
    })
})

router.get('/workouts/*', (req, res) => {
    res.render('workouts', {
        title: 'ورزش ها',
        name,
        icon
    })
})

router.get('/lists/*', (req, res) => {
    res.render('lists', {
        title: 'لیست ها',
        name,
        icon
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'ورود',
        name,
        icon
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'create',
        name,
        icon
    })
})

router.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        icon,
        errorMessage: 'Help article not found.'
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Page not found.'
    })
})

module.exports = router