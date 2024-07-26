const Product = require('../db/schema')

const getAllTasks = async (req, res) => {

    Product.find({}).then(users => {
        res.json(users)
    }).catch(err => {
        console.error(err);
    });



}
const createTask = async (req, res) => {

    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}

const getTask = async (req, res) => {
    const { id: ProductId } = req.params
    try {
        const GetProduct = await Product.findOne({ _id: ProductId })

        res.status(200).json(GetProduct)
        console.log(ProductId);
    } catch (error) {
        res.status(500).json({ msg: "No Item With id " + ProductId });
    }

}
const updateTask = async (req, res) => {
    const { id: ProductId } = req.params
    try {
        const GetUpdateProduct = await Product.updateOne({ _id: ProductId }, req.body)
        res.status(201).json(GetUpdateProduct)
        console.log(GetUpdateProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
const deleteTask = async (req, res) => {
    const { id: ProductId } = req.params
    try {
        await Product.findOneAndDelete({ _id: ProductId })
        res.status(201).json("item deleted")
        console.log("item Deleted");
    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}