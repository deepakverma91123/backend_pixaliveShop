const Cart = require('../models/cart')
const Products = require('../models/products')
exports.addCart = async (req, res) => {
    try {
        // const { productId, quantity, name, price } = req.body;

        let userId = req.user.id
        // console.log(userId)
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const productFind = await Products.findOne({ productId: req.body.id })
            // console.log(productFind, 'redrs')
            // const products = []
            const Productname = productFind.name
            const productId = productFind.id
            const productprice = productFind.price
            const quantity = req.body.quantity

            const totalSub = productprice * quantity

            // products.push(Productname, productId, totalSub, quantity, productprice)

            // console.log(products, 'pro')
            const cartAdd = await Cart.create({
                cart: {
                    userId:req.user.id,
                    productId:req.body.productId,
                    quantity: req.body.quantity,
                    name:  productFind.name,
                    price: totalSub
                    // products
                }
            })
            console.log(cartAdd)
            res.status(200).json({message:"Cart created ",cartAdd})

        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}