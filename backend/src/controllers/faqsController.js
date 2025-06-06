import faqsModel from "../models/Faqs.js"

//Creo un array de funciones vacias
const faqsController = {};

//SELECT
faqsController.getAllFaqs = async(req, res) => {

    try {
        const faqs = await faqsModel.find()
        res.status(200).json(faqs)

    } catch (error) {
        console.log("error" + error)
        res.status(500).json("Internal server error")
    }
    
}

//INSERT
faqsController.insertFaqs = async(req, res) => {

    //1- Pedir los datos
    const { question, answer, level, isActive } = req.body;

    try {
       //Validaciones
       
       //Si hay campos vacíos
       if(!question || !answer || !level || !isActive){
           return res.status(400).json({message: "Please write all the fields"})
       }

       if(level < 1 || level > 10){
           return res.status(400).json({message: "Please insert a valid level"})
       }

       if(question.length < 4 || answer.length < 4){
           return res.status(400).json({message: "Please insert a longer question or answer"})
       }

       //Guardamos todo en la base de datos
       const newFaqs = new faqsModel({ question, answer, level, isActive })

       newFaqs.save();

       res.status(200).json({message: "Faq saved"})

        
    } catch (error) {
        
        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
         
    }
}

//UPDATE
faqsController.updateFaqs = async(req, res) => {

    //1- Pido las cosas
    const { question, answer, level, isActive } = req.body;

    try {
        
        if(level < 1 || level > 10) {
            return res.status(400).json({message: "Ingrese un valor válido"})
        }

        if(question.length < 4 || answer.length < 4){
            return res.status(400).json({message: "Please insert a longer question or answer"})
        }

        const faqsUpdated = await faqsModel.findByIdAndUpdate(
            req.params.id,
            {question, answer, level, isActive},
            {new: true}
        )

        if(!faqsUpdated){
            return res.status(400).json({message: "Faqs not found"})
        }

        res.status(200).json({message: "Faqs updated"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//ELIMINAR
faqsController.deleteFaqs = async (req, res) => {

    try {
        
        const deleteFaqs = await faqsModel.findByIdAndDelete(req.params.id);

        if(!deleteFaqs){
            return res.status(400).json({message: "Faq not found"})
        }

        res.status(200).json({message: "Faq deleted"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

export default faqsController;