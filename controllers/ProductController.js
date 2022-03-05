const express = require('express')
const { Category } = require('../models/catergoies')
const Product = require('../models/products')
// const ApiFeatures = require('../utilis/apiFeatures')

exports.newproduct = async (req, res) => {
    try {
        req.body.user = req.user.id
        const product = await Product.create(req.body)
        res.status(200).json({ message: "Sucess", product })
    } catch (err) {
        console.log(err)
    }
}

exports.Getproduct = async (req, res) => {
    try {
        const products = await Product.find();
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
        .then((result) => {
            res.status(200).json({ result, count: Product.length })
        })
    // if (!searchproducts) {

    // }
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
<<<<<<< HEAD
        const categoryById = await Category.findById(req.params.id);
        console.log(categoryById)
      
        const getListByCategory = await Product.find({category:categoryById});
=======
        const categoryById = await Category.find({id:req.params.id});
        console.log(categoryById)
        const getListByCategory = await Product.find({categoryById}).populate('Category')
>>>>>>> dc23d94e482b4daf5c666a80d8c6a219c7b68615
        if (!getListByCategory) {
            res.status(400).json({ message: "cant find data" })
        }
        res.status(200).json({ message: "Product by categroies", getListByCategory })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}
