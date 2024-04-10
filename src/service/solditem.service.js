import { logger } from "../config/index.js";
import { BadRequestError, NotFoundError } from "../error/index.js";
import { dateUtils } from "../utils/index.js";

export default class SoldItemService{

    constructor(soldItemRepository){
        this.soldItemRepository = soldItemRepository;
    }

    async findAllSoldItems(){
        logger.info("SoldItemService: fetching all sold items");
        return this.soldItemRepository.findAllSoldItems();
    }

    async findSoldItemById(id){
        logger.info("SoldItemService: fetching sold item by id");
        const soldItem = await this.soldItemRepository.findSoldItemById(id);

        if(!soldItem){
            logger.error("SoldItemService: sold item not found by id");
            throw new NotFoundError("Sold Item", id);
        }
        
        logger.info("SoldItemService: sold item found");
        return soldItem;
    }

    async findAllSoldItemsByDate(date){
        logger.info("SoldItemService: fetching all sold items by date");
        return await this.soldItemRepository.findAllSoldItemsByDate(date);
    }

    async calculateProfit(dateString){

        logger.info("SoldItemService: calculating profit");

        logger.info("SoldItemService: convert string to date");
        const date = dateUtils.stringToDate(dateString);

        if(date > new Date()){
            logger.error("SoldItemService: profit date is greater than today's date");
            throw new BadRequestError(`Cannot fetch profit for date ${date.toDateString()}`, {
                msg: "Date should not be greater than today's date",
                date: dateString,
            })
        }

        logger.info("SoldItemService: fetching all sold items by date");
        const soldItems = await this.soldItemRepository.findSoldItemsByDate(date);

        logger.info("SoldItemService: adding profit for all sold items");
        const totalProfit = soldItems.reduce((profit, soldItem)=>{
            return profit + (soldItem.quantity * (soldItem.item.sellingPrice - soldItem.item.costPrice));
        }, 0);

        logger.info("SoldItemService: returns total profit");
        return totalProfit;

    }
}