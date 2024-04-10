import mongoose from "mongoose";
import { logger } from "../config/index.js";
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

        logger.info("ItemRepository: creating item");
        return await newItem.save();
    }

    async deleteItemById(itemId){

        logger.info("ItemRepository: deleting item by id");
        await ItemModel.deleteOne({
            _id: itemId
        })

        return;
    }

    async deleteExpiredItems(){
        logger.info("ItemRepsitory: deleting all expired items");
        await ItemModel.deleteMany({
            expiryDate: {$lte: new Date()}
        });

        return;
    }

    async findAllExpiredItems(){
        logger.info("ItemRepository: fetching all expired items");
        return await ItemModel.find({
            expiryDate: {$lte: new Date()}  
        });
    }

    async findAllItems(){
        logger.info("ItemRepository: fetching all items");
        return await ItemModel.find();
    }

    async findItemById(id){
        logger.info("ItemRepository: fetching item by id");
        return await ItemModel.findById(id);
    }

    async updateItemById(itemId, itemData){
        logger.info("ItemRepository: updating item by id");
        await ItemModel.updateOne({
            _id: itemId
        }, itemData);

        return;
    }

    async sellItem(item, sellingQuantity, sellingDate){
        logger.info("ItemRepository: selling item");
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
        logger.info("ItemRepository: sold item");
        return;
    }
}