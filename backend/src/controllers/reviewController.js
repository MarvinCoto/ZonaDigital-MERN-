const reviewController = {};

import reviewModel from "../models/Review.js"

// SELECT
reviewController.getReviews = async (req, res) => {
    const reviews = await reviewModel.find().populate('idClient')
    res.json(reviews)
}

// INSERT 
reviewController.createReviews = async (req, res) => {
    const {comment, rating, idClient} = req.body;
    const newReview = new reviewModel({comment, rating, idClient})
    await newReview.save()
    res.json({message: "Review guardada"})
}

// DELETE
reviewController.deleteReviews = async (req, res) => {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.json({message: "Review eliminada"})
}

// UPDATE
reviewController.updateReviews = async (req, res) => {
    //Solicito todos los valores 
    const {comment, rating, idClient} = req.body;
    //Actualizo
    await productsModel.findByIdAndUpdate(req.params.id, {comment, rating, idClient}, {new: true});
    //Muestro un mensaje que todo se actualizó
    res.json({message: "Review actualizada"});
}

export default reviewController;

