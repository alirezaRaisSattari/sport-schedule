const mongoose = require('mongoose')

const Repo = mongoose.model('Repo', {
    name: {
        type: String,
        required: true,
        trim: true
    },
})

// warning
// Repo.deleteMany({}, function (err) {
//     console.log('collection removed')
// });

module.exports = Repo