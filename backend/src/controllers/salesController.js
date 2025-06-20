import salesModel from "../models/Sales.js";

//Array de funciones vacías
const salesController = {};

//Ventas por categoría
salesController.salesByCategory = async(req, res) => {
    try {

        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$category",
                        totalVentas: {$sum: "$total"}
                    }
                },
                //Ordenar
                {
                    $sort: {totalVentas: -1} //-1: Mayor a menor y 1 Menor a mayor
                }
            ]
        )

        res.status(200).json(resultado)

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//Productos más vendidos
salesController.bestSellingProducts = async(req, res) => {

    try {
        
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$product",
                        cantidad: {$sum: 1}
                    }
                },
                //Ordenar
                {
                    $sort: {cantidad: -1}
                },
                //Limitar la cantidad de datos a mostrar
                {
                    $limit: 5
                }
            ]
        )

        res.status(200).json(resultado)

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }

};

salesController.frequentCustomer = async(req, res) => {

    try {
        
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$customer",
                        compras: {$sum: 1}
                    }
                },
                //Ordenar
                {
                    $sort: {compras: -1}
                },
                //Limite de 3
                {
                    $limit: 3
                }

            ]
        )

        res.status(200).json(resultado)


    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//Ganancias totales
salesController.totalEarnings = async(req, res) => {

    try {
        
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        gananciasTotales: {$sum: "$total"}
                    }
                }
            ]
        )

        res.status(200).json(resultado)

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//Guardar una nueva venta
salesController.insertSales = async(req, res) => {

    try {
        
        const { product, category, customer, total, date } = req.body;

        const newSale = new salesModel({product, category, customer, total, date})

       await newSale.save()

        res.status(200).json({message: "Sale saved"})

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

export default salesController;
