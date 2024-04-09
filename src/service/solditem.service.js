import BadRequestError from "../error/badrequest.error.js";
import NotFoundError from "../error/notfound.error.js";
import { dateUtils } from "../utils/index.js";

export default class SoldItemService{

    constructor(soldItemRepository){
        this.soldItemRepository = soldItemRepository;
    }

    async findAllSoldItems(){
        return this.soldItemRepository.findAllSoldItems();
    }

    async findSoldItemById(id){
        const soldItem = await this.soldItemRepository.findSoldItemById(id);

        if(!soldItem){
            throw new NotFoundError("Sold Item", id);
        }
        
        return soldItem;
    }

    async findAllSoldItemsByDate(date){
        return await this.soldItemRepository.findAllSoldItemsByDate(date);
    }

    async calculateProfit(dateString){

        const date = dateUtils.stringToDate(dateString);

        if(new Date(date) > new Date()){
            throw new BadRequestError(`Cannot fetch profit for date ${date.toLocaleString()}`, {
                msg: "Date should not be greater than today's date",
                date: dateString,
            })
        }

        const soldItems = await this.soldItemRepository.findSoldItemsByDate(date);

        const totalProfit = soldItems.reduce((profit, soldItem)=>{
            return profit + (soldItem.quantity * (soldItem.item.sellingPrice - soldItem.item.costPrice));
        }, 0);


        return totalProfit;

    }
}