//Array de métodos (C R U D)
const productsControllers = {};
import productsModel from "../models/Products.js"

// SELECT
productsControllers.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

//INSERT
productsControllers.createProducts = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const newProduct = new productsModel({name, description, price, stock});
    await newProduct.save();
}
