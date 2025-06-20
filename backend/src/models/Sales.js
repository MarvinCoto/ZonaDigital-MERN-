/*
   Sales: 
       product
       category
       customer
       total
       date
*/

import { model, Schema } from "mongoose";

const salesSchema = new Schema(
    {
        product: {
            type: String,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
        customer: {
            type: String,
            require: true,
        },
        total: {
            type: Number,
            require: true,
            min: 0.01,
            max: 1000
        },
        date: {
            type: Date,
            require: true,
        }
    
    },{
        timestamps: true,
        strict: false
    }
)

export default model("sales", salesSchema);