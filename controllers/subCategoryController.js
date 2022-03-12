const { SubCategory } = require('../models/subCategories');

exports.addSubCategory = (req, res) => {
    try {
        const subCategories = new SubCategory({
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
        })
        await subCategories.save()
        res.status(200).json({ message: "categoy saved sucessfull", subCategories })
    } catch (err) {
        console.log(err);
    }
}