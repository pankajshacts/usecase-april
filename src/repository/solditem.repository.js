import { logger } from "../config/index.js";
import { SoldItemModel } from "../model/sold_item.model.js";

export default class SoldItemRepository{
    async findAllSoldItems(){
        logger.info("SoldItemRepository: fetching all sold items");
        return await SoldItemModel.find();
    }

    async findSoldItemById(id){
        logger.info("SoldItemRepository: fetching sold item by id");
        return await SoldItemModel.findById(id);
    }

    async findSoldItemsByDate(date){
        logger.info("SoldItemRepository: fetching all sold items by date");

        const startDay = new Date(date);
        const endDay = new Date(date);
        endDay.setDate(startDay.getDate() + 1);

        return await SoldItemModel.find({sellingDate:{
            $gte: startDay,
            $lt: endDay,
        }})
    }
}