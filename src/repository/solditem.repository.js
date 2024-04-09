import { SoldItemModel } from "../model/sold_item.model.js";

export default class SoldItemRepository{
    async findAllSoldItems(){
        return await SoldItemModel.find();
    }

    async findSoldItemById(id){
        return await SoldItemModel.findById(id);
    }

    async findSoldItemsByDate(date){
        const startDay = new Date(date);
        const endDay = new Date(date);

        endDay.setDate(date.getDate() + 1);
    
        return await SoldItemModel.find({sellingDate:{
            $gte: startDay,
            $lt: endDay,
        }})
    }
}