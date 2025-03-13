//Array de métodos (C R U D)
const employeesController = {};
import employeesModel from "../models/Clients.js"

// SELECT
employeesController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find()
    res.json(employees)
}

// INSERT
employeesController.createEmployees = async (req, res) => {
    const { name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified } = req.body;
    const newEmployees = new employeesModel({name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified});
    await newEmployees.save();

    res.json({ message: "employee saved"});
}

// DELETE
employeesController.deleteEmployees = async (req, res) => {
    await employeesModel.findOneAndDelete(req.params.id)
    res.json({ message: "employee deleted"})
}

// UPDATE 
employeesController.updateEmployees = async (req, res) => {
    //Solicito todos los valores 
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    //Actualizo
    await employeesModel.findByIdAndUpdate(req.params.id, {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified}, {new: true});
    //Muestro un mensaje que todo se actualizó
    res.json({message: "employee updated"});
};

export default employeesController;

/*
   Campos:
       name
       lastName
       birthday
       email
       address
       hireDate
       password
       telephone
       dui
       isssNumber
       isVerified
*/