const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const path = require('path')
const hbs = require('hbs')
const templateRouter = require('./routers/templates.js')
const userRouter = require('./routers/user')
const repoRouter = require('./routers/sportRepo')
const taskRouter = require('./routers/task')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.static(publicDirectoryPath))
app.use(userRouter)
app.use(taskRouter)
app.use(repoRouter)
app.use(templateRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})