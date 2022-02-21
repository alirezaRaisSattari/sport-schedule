const templateRouter = require('./routers/templates.js')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')

const port = process.env.PORT || 3000

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(userRouter)
app.use(taskRouter)
app.use(templateRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})