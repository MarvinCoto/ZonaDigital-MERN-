//Array de métodos (C R U D)
const branchesController = {};
import branchesModel from "../models/Branches.js"

// SELECT
branchesController.getBranches = async (req, res) => {
    const branches = await branchesModel.find()
    res.json(branches)
}

// INSERT
branchesController.createBranches = async (req, res) => {
    const { name, address, telephone, schedule } = req.body;
    const newBranch = new branchesModel({name, address, telephone, schedule});
    await newBranch.save();

    res.json({ message: "branch saved"});
}

// DELETE
branchesController.deleteBranches = async (req, res) => {
    await branchesModel.findOneAndDelete(req.params.id)
    res.json({ message: "branch deleted"})
}

// UPDATE 
branchesController.updateBranches = async (req, res) => {
    //Solicito todos los valores 
    const {name, address, telephone, schedule} = req.body;
    //Actualizo
    await branchesModel.findByIdAndUpdate(req.params.id, {name, address, telephone, schedule}, {new: true});
    //Muestro un mensaje que todo se actualizó
    res.json({message: "branch updated"});
};

export default branchesController;