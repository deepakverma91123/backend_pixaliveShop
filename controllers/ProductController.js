const express = require('express')
const { Category } = require('../models/catergoies')
const Product = require('../models/products')
const cloudinary = require('cloudinary')

exports.newproduct = async (req, res) => {
    try {
        // let images = []
        // if (typeof req.file.images === 'string') {
        //     images.push(req.file.images)
        // } else {
        //     images = req.file.images
        // }
        // let imagesLinks = [];
        // for (let i = 0; i < images.length; i++) {
        //     const result = await cloudinary.v2.uploader.upload(images[i], {
        //         folder: 'products'
        //     });
        //     imagesLinks.push({
        //         public_id: result.public_id,
        //         url: result.secure_url
        //     })
        // }
        // // console.log(req.file.images, images);
        // req.file.images = imagesLinks
        req.body.user = req.user.id;
        const product = await Product.create(req.body)
        if (!product) {
            res.status(400).json({ message: "failed to add product" })
        }
        res.status(200).json({ message: "Sucess", product })
    } catch (err) {
        console.log(err)
    }
}

exports.Getproduct = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('subCategory');


        res.status(200).json({
            message: "Product fetch",
            count: products.length,
            products

        })
    } catch (err) {
        console.log(err)
    }
}
// search by keywords
exports.search = async (req, res) => {
    var regex = new RegExp(req.params.name, 'i')
    const searchproducts = await Product.find({ name: regex })
    // .then((result) => {
    //     res.status(200).json({ result, count: Product.length })
    // })
    if (!searchproducts) {
        res.status(400).json({ message: "not found" })
        return;
    }
    res.status(200).json({
        searchproducts,
        count: Product.length
    })
}


exports.updateProducts = async (req, res) => {
    try {
        const products = await Product.findById(req.params.product)
        // console.log(category, 'category')
        if (products) {
            res.status(400).json({ message: " found" })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            wishlist: req.body.wishlist,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            // "seller": "self",
            stock: req.body.stock,
            // "numbOfReviews": 2,
            // "user": "622d90f31dc844dcdbee7620",
            // "reviews
        }, { new: true })
        if (!product) {
            res.status(400).json({ message: "Product list not avaialble" })
        }
        res.status(200).json(product)
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.deleteProducts = async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id);
        if (!products) {
            res.status(400).json({
                message: "failed to fetch or delete product",

            })
        }
        await products.remove()
        res.status(200).json({
            message: true,
        })
    } catch (err) {
        console.log(err)
    }
}
exports.getListByCategory = async (req, res) => {
    try {
        // let filter = {}
        // if (req.query.Category) {
        //     filter = { Category: req.params.Category.split(',') }
        // }
        const categoryById = await Category.findById(req.params.id);
        console.log(categoryById)

        const getListByCategory = await Product.find({ category: categoryById });
        if (!getListByCategory) {
            res.status(400).json({ message: "cant find data" })
            return;
        }
        res.status(200).json({ message: "Product by categroies", getListByCategory })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.productreview = async (req, res) => {
    try {

        const reviews = await Product.findById(req.params.id);
        console.log(reviews)

        this.products.filter(res => {
            console.log(res)
        })
        res.status(200).json({
            message: "Product reviews",

            reviews

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.sortbyprice = async (req, res) => {
    try {
        // const sortObject = {};
        const p = req.params.price
        console.log(p)
        const pricedata = await Product.find({ price: { $eq: p } }).select({ price: 1, name: 1 }).sort({ price: -1 });
        console.log(pricedata)


        res.status(200).json({
            message: "Sort By Price",

            pricedata

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}



exports.sortbypriceeq = async (req, res) => {
    try {
        const sortObject = {};
        const p = req.params.price
        console.log(p)
        const pricedata = await Product.find({ price: { $gte: p } }).select({ price: 1, name: 1 }).sort({ price: -1 });
        console.log(pricedata)

        // this.products.filter(res => {
        //     console.log(res)
        // })
        res.status(200).json({
            message: "Sort By Price",

            pricedata

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.lessthensortbyprice = async (req, res) => {
    try {
        const sortObject = {};
        const p = req.query.price
        const s = req.query.prices

        console.log('p',p)
        console.log('s',s)
        const pricedatafilter = await Product.find({ price: { $gte: p,$lte:s } }).select({ price: 1, name: 1 }).sort({ price: -1 });
        // const pricedatafilter = await Product.find({ price: { $gt:p,$lt:s} }).select({ price: 1, name: 1 }).sort({ price: -1 });
        console.log(pricedatafilter)

        // this.products.filter(res => {
        //     console.log(res)
        // })
        res.status(200).json({
            message: "Sort By Price",

            pricedatafilter

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.GetproductById = async (req, res) => {
    try {
        const getProductId = await Product.findById(req.params.id).populate('category').populate('subCategory');
        if (!getProductId) {
            res.status(400).json({ message: "Product Not Found" })
            return;
        }
        res.status(200).json({ message: "Product By Category", getProductId })

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
        console.log(err)
    }
}


exports.Promotion = async (req, res) => {
    try {
        const getProductId = await Product.findById(req.params.id).populate('category', 'user')
        if (!getProductId) {
            res.status(400).json({ message: "Product Not Found" })
            return;
        }
        res.status(200).json({ message: "Product By Promotion", getProductId })

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
        console.log(err)
    }
}
