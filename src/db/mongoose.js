const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://alireza:hora1393@cluster0.hjage.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})