// const express = require('express')
// const app = express()

// app.use((req, res, next) => {
//     requireLogin(req, res, next)
// })
function requireLogin(req, res, next) {
    const token = localStorage.getItem("token")
    if (token && token != 'undefined') {
        next();
    } else {
        res.redirect("/login");
    }
}
module.exports = requireLogin