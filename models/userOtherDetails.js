const mongoose = require('mongoose')

const userOtherDetailSchema = mongoose.Schema({
    address:{
        type:Array,
        required:true
    },
    cardDetails: {
        type: Array,
        required: true
    },
    // user:{
    //     type:mongoose.Schema.objectId,
    //     ref:'User'
    // }
})


module.exports.UserOtherDetails = mongoose.model('UserOtherDetails', userOtherDetailSchema)