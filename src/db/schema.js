const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        category: String,
        stock: Number
    }
)

const Product = mongoose.model("app", productSchema)


module.exports = Product
