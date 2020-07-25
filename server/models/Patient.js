const { Schema, model } = require('mongoose')
const patient = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    second_name: {
        type: String,
        required: true
    },
    recording_date: {
        type: Date,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }

})
module.exports = model('Patient', patient)