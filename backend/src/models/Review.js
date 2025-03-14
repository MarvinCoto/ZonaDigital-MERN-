/*
   Campos:
          Comment
          Rating
          idClient

*/

import { Schema, model } from "mongoose";

const reviewSchema = new Schema ({
    comment: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true,
        max: 5
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: "Clients",
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Reviews", reviewSchema)