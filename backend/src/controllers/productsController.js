//Array de métodos (C R U D)
const productsController = {};
import productsModel from "../models/Products.js"

// SELECT
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

// INSERT
productsController.createProducts = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const newProduct = new productsModel({name, description, price, stock});
    await newProduct.save();

    res.json({ message: "product saved"});
}

// DELETE
productsController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({ message: "product deleted"})
}

// UPDATE 
productsController.updateProducts = async (req, res) => {
    //Solicito todos los valores 
    const {name, description, price, stock} = req.body;
    //Actualizo
    await productsModel.findByIdAndUpdate(req.params.id, {name, description, price, stock}, {new: true});
    //Muestro un mensaje que todo se actualizó
    res.json({message: "product updated"});
};


//Stock total de productos
productsController.totalStock = async(req, res) => {

    try {
        
        const resultado = await productsModel.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        totalStock: {$sum: "$stock"}
                    }
                }
            ]
        )

        res.status(200).json(resultado)

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default productsController;