const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    bellyAround: {
        type: Number,
    },
    plan: [{
        date: {
            type: String,
        },
        list: [{
            number: {
                type: Number,
            },
            set: {
                type: Number,
            },
            sportName: {
                type: String,
            },
            weight: {
                type: Number,
            }
        }]
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

//warning
Task.deleteMany({}, function (err) {
    console.log('collection removed')
});

module.exports = Task