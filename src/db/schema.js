const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, 'Must Provide Name'],
            maxlength: [20, 'name can not be more than 20 characters']
        },
        completed:
        {
            type: Boolean,
            default: false

        }
    }
)

const Product = mongoose.model("app", productSchema)


module.exports = Product
