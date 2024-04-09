import { model, Schema } from "mongoose";

export const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    expiryDate:{
        type: Date,
        requierd: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    costPrice:{
        type: Number,
        required: true,
    },
    sellingPrice:{
        type: Number,
        required: true,
    }
})

export const ItemModel = model("Items", itemSchema);