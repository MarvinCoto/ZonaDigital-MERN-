//Array de métodos (C R U D)
const clientsController = {};
import clientsModel from "../models/Clients.js"

// SELECT
clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find()
    res.json(clients)
}

// INSERT
clientsController.createClients = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body;
    const newClient = new clientsModel({name, lastName, birthday, email, password, telephone, dui, isVerified});
    await newClient.save();

    res.json({ message: "client saved"});
}

// DELETE
clientsController.deleteClients = async (req, res) => {
    await clientsModel.findByIdAndDelete(req.params.id)
    res.json({ message: "client deleted"})
}

// UPDATE 
clientsController.updateClients = async (req, res) => {
    //Solicito todos los valores 
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    //Actualizo
    await clientsModel.findByIdAndUpdate(req.params.id, {name, lastName, birthday, email, password, telephone, dui, isVerified}, {new: true});
    //Muestro un mensaje que todo se actualizó
    res.json({message: "client updated"});
};

export default clientsController;

/*
   Campos:
       name
       lastName
       birthday
       email
       password
       telephone
       dui
       isVerified
*/