const mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    Category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    // product: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Products'54
    // }
})


module.exports.SubCategory = mongoose.model('SubCategory', subCategorySchema)