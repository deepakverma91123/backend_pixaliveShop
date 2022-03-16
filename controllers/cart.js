const Cart = require('../models/cart')
const Products = require('../models/products')
exports.addCart = async (req, res) => {
    try {
        const productFind = await Products.findById(req.body.productId)

        // console.log(productFind, 'redrs')
        // const products = []
        const Productname = productFind.name
        const productId = productFind.id
        const productprice = productFind.price
        const quantity = req.body.quantity

        const totalSub = productprice * quantity

        // products.push(Productname, productId, totalSub, quantity, productprice)

        // console.log(products, 'pro')
        req.body.userId = req.user.id;
        console.log(req.body.userId)
        const cartAdd = await Cart.create(
            req.body

            // cart: {
            //     // userId: carts,
            //     userId: req.user.id,
            //     productId: req.body.productId,
            //     quantity: req.body.quantity,
            //     name: productFind.name,
            //     price: totalSub
            //     // products
            // }
        )
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
        res.status(200).json({ message: "cartList ", cartList })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }





}