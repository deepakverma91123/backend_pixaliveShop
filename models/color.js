const mongoose = require('mongoose')

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    }
})


module.exports.color = mongoose.model('color', colorSchema)