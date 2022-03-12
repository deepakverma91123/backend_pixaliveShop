const Product = require('../models/products')
// const ApiFeatures = require('../utilis/apiFeatures')

exports.newwishlist = async (req, res) => {
    try {
        req.body.user = req.user.id
        const wishlist = await Product.create(req.body)
        if (!wishlist) {
            res.status(400).json({message:"failed to add wishlist"})
        }
        res.status(200).json({ message: "Sucess", wishlist })
    } catch (err) {
        console.log(err)
    }
}

exports.Getwishlist = async (req, res) => {
    try {
        const wishlists = await Product.find();


        res.status(200).json({
            message: "Wishlist fetch",
            count: wishlists.length,
            wishlists

        })
    } catch (err) {
        console.log(err)
    }
}
 
 
exports.deletewishlist = async (req, res) => {
    try {
        const wishlists = await Product.findByIdAndDelete(req.params.id);
        if (!products) {
            res.status(400).json({
                message: "failed to fetch or delete wishlist",

            })
        }
        await wishlists.remove()
        res.status(200).json({
            message: true,
        })
    } catch (err) {
        console.log(err)
    }
}
 


 


 

 
