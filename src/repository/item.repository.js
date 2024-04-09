import mongoose from "mongoose";
import { ItemModel } from "../model/item.model.js";
import { SoldItemModel } from "../model/sold_item.model.js";

export default class ItemRepository{
    async createItem(itemData){

        const newItem = new ItemModel({
            name: itemData.name,
            expiryDate: itemData.expiryDate,
            quantity: itemData.quantity,
            costPrice: itemData.costPrice,
            sellingPrice: itemData.sellingPrice,
        });

        return await newItem.save();
    }

    async deleteItemById(itemId){

        await ItemModel.deleteOne({
            _id: itemId
        })

        return;
    }

    async deleteExpiredItems(){
        await ItemModel.deleteMany({
            expiryDate: {$lte: new Date()}
        });

        return;
    }

    async findAllExpiredItems(){
        return await ItemModel.find({
            expiryDate: {$lte: new Date()}
        });
    }

    async findAllItems(){
        return await ItemModel.find();
    }

    async findItemById(id){
        return await ItemModel.findById(id);
    }

    async updateItemById(itemId, itemData){
        await ItemModel.updateOne({
            _id: itemId
        }, itemData);

        return;
    }

    async sellItem(item, sellingQuantity, sellingDate){
        const soldItem = new SoldItemModel({
            quantity: sellingQuantity,
            item: item,
            sellingDate: sellingDate
        })

        const session = await mongoose.startSession();
        session.startTransaction();

        // Transaction statement
        await soldItem.save();
        await this.updateItemById(item._id, {
            quantity: item.quantity - sellingQuantity,
        });


        await session.commitTransaction();
        await session.endSession();
        return;
    }
}