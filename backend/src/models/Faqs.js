/*
   Colección: Frecuency Answer and Question
   Campos:
       question
       answer
       level
       isActive
*/

import { Schema, model } from "mongoose";

const faqsChema = new Schema (
    {
        question: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 100,
            trim: true
        },
        answer: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 100,
            trim: true
        },
        level: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("faqs", faqsChema)