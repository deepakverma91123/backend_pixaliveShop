const { color } = require("../models/color");


exports.createColor = async (req, res) => {
    try {
        const colors = new color({
            name: req.body.name,
        })
        await colors.save()
        res.status(200).json({ message: "color added successfull", colors })
    } catch (err) {
        console.log(err);
    }
}

exports.getcolor = async (req, res) => {
    try {
        console.log(req)
        const colorList = await color.find()
        console.log(colorList)
        if (!colorList) {
            res.status(400).json({ message: "color lIst not found" });
            return;
        }
        res.status(200).json({ message: "color list", colorList })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.getcolorById = async (req, res) => {
    try {
        const colorById = await color.findById(req.params.id);
        if (!colorById) {
            res.status(400).json({ message: "failed to fetch data" })
            return;
        }
        res.status(200).json({ message: "color Fetch sucessfully", colorById })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}