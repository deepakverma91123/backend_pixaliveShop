const Cart = require('../models/cart')
const Products = require('../models/products')
exports.addCart = async (req, res) => {
    try {
        const productFind = await Products.findById(req.params.id)

        console.log(productFind, 'redrs')
        // const products = []
        const Productname = productFind.name
        // const productId = productFind.id
        const productprice = productFind.price
        const quantity = req.body.quantity

        const totalSub = productprice * quantity

        req.body.userId = req.user.id;
        console.log(req.body.userId)
        const cartAdd = await Cart.create({
            userId: req.user.id,
            cart: {
                // productId: productFind.id,
                quantity: req.body.quantity                ,
                name: productFind.name,
                price: productFind.price
            }
        })
        console.log(cartAdd)
        res.status(200).json({ message: "Cart created ", cartAdd })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}
exports.getCart = async (req, res) => {

    try {
        const cartList = await Cart.find();
        console.log(cartList)

        if (!cartList) {
            res.status(400).json({ message: "cartList   not found" });

            return;
        }
        res.status(200).json({ message: "cartList ",count:cartList.length, cartList })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

// exports.updateCart = async (req, res) => {
//     try {
//         req.body.userId = req.user.id;
//         const data = req.body
//         const updatecart = await Cart.findByIdAndUpdate(req.params.id, {
//             data
//         }, {
//             new: true
//         })
//         if (!updatecart) {
//             res.status(400).json({ message: "Cannot update the cart" })
//             return;
//         }
//         res.status(200).json({ message: "cart update", updatecart })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: "something went wrong" })
//     }
// }