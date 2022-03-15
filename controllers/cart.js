const Product = require('../models/products')


exports.AddCart = async (req, res) => {
    try {
        let findproduct = await Product.findById(req.params.id)
        if (!findproduct) {
            res.status(400).json({ message: "No product FOund for this ID" })
            return;
        }
        console.log(findproduct,'products')
        if (findproduct) {
           
         let pricedata = findproduct.price
         console.log(pricedata)       
        let qty = req.body.qty
        
        let cal = qty* pricedata
        console.log(cal)
            res.status(200).json({message:"FInal price of product",cal})
        }
    } catch {
        console.log(err)
    }
}