const Product = require('../models/products')
// const ApiFeatures = require('../utilis/apiFeatures')

exports.newwishlist = async (req, res) => {
    try {

        let findproduct = await Product.findById(req.params.id)
        console.log(findproduct)
        if (!findproduct) {
            res.status(400).json({ message: "prodcut does not exist" })
            return;
        }
        if (findproduct) {
            const newUserData = {
                wishlist: req.body.wishlist,
                wishlistPrice: req.body.wishlistPrice
            }
            // console.log(req.user.id)
            const wishlist = await Product.findByIdAndUpdate(req.params.id, newUserData, {
                new: true
            })
            console.log(wishlist)
            if (wishlist) {
                res.status(200).json({message:"wishlist Updated",wishlist})
                return;
            }
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({message:"something Went wrong"})
    }
}

exports.Getwishlist = async (req, res) => {
    try {
        const wishlists = await Product.find();
        res.status(200).json({
            message: "Wishlist fetch",
            // count: wishlists.length,
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









