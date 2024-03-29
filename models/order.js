const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        city: {
            type: String,
            require: true
        },
        phoneNo: {
            type: Number,
            require: true
        },
        postalCode: {
            type: Number,
            require: true
        },
        country: {
            type: String,
            require: true
        }
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // cart: {
    //     type: Number,
    //     default: 1
    // },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        },
    },
     paidAt: {
        type: Date
    },
    itemPrices: {
        type: Number,
        // require: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        // require: true,
        default: 0.0
    },
    ShippingPrice: {
        type: String,
        // require: true,
        default: 0.0
    },
    totalPrice: {
        type: String,
        // require: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        // require: true,
        default: "process"
    },
    deliveryAt: {
        type: Date,
        // require: true
    },
    createdAt: {
        type: Date,
        // required: true
    },

})

module.exports = mongoose.model('Order', orderSchema)