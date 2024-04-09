import { model, Schema } from "mongoose";
import {itemSchema} from "./item.model.js";

const soldItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    
    sellingDate: {
        type: Date,
        required: true,
    },

    item: itemSchema,

}, {timestamps: true});

export const SoldItemModel = model("Sold_item", soldItemSchema);