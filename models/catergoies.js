const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    color: {
        type: String,
    },
    icon: {
        type: String
    },
    image: {
        type: String
    }
})


module.exports.Category = mongoose.model('Category', categorySchema)