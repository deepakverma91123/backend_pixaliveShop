const Order = require('../models/order')
const Products = require('../models/products')
const Cart = require('../models/cart')
const { get } = require('mongoose')


exports.newOrder = async (req, res) => {
    try {
        const {
            cart,
            shippingInfo,
            totalPrice,
            ShippingPrice,
            taxPrice,
            itemPrices,
            paymentInfo
        } = req.body
        console.log(req.body.cart, 'user')
        const order = await Order.create({
            cart,
            shippingInfo,
            totalPrice,
            ShippingPrice,
            taxPrice,
            itemPrices,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
        })
        console.log(order, 'orders')
        // let orderId = order._id
        // console.log(orderId, 'orderid')
        // if (orderId) {
        //     console.log
        // }
        // if (order) {

        // const productStock = await Cart.findById(req.body.cart)
        // let quantity = productStock.subQuantity
        // let getStock 
        // let updatedStock
        // let updateProduct
        // let itemCart = productStock.items
        // itemCart.map(async i=>{
        //     let getIdProduct = await Products.findById(i.productId)
        //     console.log(i._id, 'id');
        //     let getProductQuantity = await Cart.findById(i._id)
        //     console.log(getProductQuantity, 'cartQuan');
        //     getStock = getIdProduct.stock
        //     updatedStock = getStock - quantity
        //     updateProduct = await Products.findByIdAndUpdate(getIdProduct, {stock: updatedStock}, {
        //         new:true,
        //         useFindAndModify: false
        //     })
        //     console.log(updateProduct);
        // })
        res.status(200).json({ message: "order placed sucessfully", order })
        // }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Something went Wrong" })
    }
}


// getsingleorder for logged in user

exports.getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('cart')
        if (!order) {
            res.status(400).json({ message: "order not found" })
            return;
        }
        res.status(200).json({ message: "Order found", order })
    } catch (err) {
        res.status(401).json({ message: "something went wrong" })
    }
}


exports.myOrder = async (req, res) => {
    try {
        console.log(req.user.id)
        // const users = await user.find({ user: req.user.id })
        const orders = await Order.find({ user: req.user._id })
        console.log(orders)
        if (!orders) {
            res.status(400).json({ message: "you have no orders" })
            return;
        }
        res.status(200).json({ message: "order", orders })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "something went wrong 1" })
    }

}


exports.allOrders = async (req, res) => {
    try {

        const orders = await Order.find()
        let totalPrice = 0;
        orders.forEach(Order => {
            totalPrice += Order.totalPrice
        })
        if (orders) {
            res.status(200).json({ message: "Order fornd", totalPrice, orders })
            return;
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "order not found" })
    }
}
// 

// 
exports.updateOrderStatus = async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id).populate('cart')
        console.log(orders, 'order')
        if (orders.orderStatus === 'process') {
            // res.status(201).json({ message: "you have already delivered the order" })
            console.log(orders.cart, 'data')
            let a = orders.cart.items
            a.map(async(b) => {
                await updateStock( b.productId,b.quantity)
            })

            // orders.orderItems.forEach(async item => {
            //     await updateStock(item.product, item.quantity)
            // })

            orders.orderStatus = req.body.status,
                orders.deliveredAt = Date.now()

            await orders.save()
            res.status(200).json({message:"stock updates suceesfullly"})
            return;
            // if (orders) {
            //     return res.status(200).json({ message: "Order found", orders });
            // }
            // return;
        }
        // else {
            res.status(402).json({ message: "order not found" })
        // }
    } catch (err) {
        res.status(400).json({ message: "err" })
    }
}

async function updateStock(id, quantity) {
    const product = await Products.findById(id)
    console.log(product, 'oro')
    product.stock = product.stock - quantity
    // console.log(product.stock,'kskskkskskksks')
    await product.save()
}

exports.deleteOrder = async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id)
        if (!orders) {
            res.status(400).json({ message: "No order found" })
            return;
        }
        await orders.remove()
        res.status(200).json({ message: "order deleted sucessfully", orders })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "something went wrong" })
    }
}

