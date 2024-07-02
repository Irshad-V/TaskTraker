const Product = require('../db/schema')

const getAllTasks = (req, res) => {



    Product.find({}).then(users => {
       
        res.json(users)
    }).catch(err => {
        console.error(err);
    });

   

}
const createTask = (req, res) => {
    res.json(req.body)

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.categor,
        stock: req.body.stock
    })
    newProduct.save()
        .then(saveProdcut => console.log('Product saved:', saveProdcut))
        .catch(err => console.log('Product savng err:', err))
}


const getTask = (req, res) => {
    res.json({ id: req.params.id })
}
const updateTask = (req, res) => {
    res.send('update Items')
}
const deleteTask = (req, res) => {
    res.send('delete Items')
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}