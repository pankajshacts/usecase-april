import NotFoundError from "../error/notfound.error.js";

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

    async calculateProfit(date){

        date = new Date(date);

        const soldItems = await this.soldItemRepository.findSoldItemsByDate(date);

        const totalProfit = soldItems.reduce((profit, soldItem)=>{
            return profit + (soldItem.quantity * (soldItem.item.sellingPrice - soldItem.item.costPrice));
        }, 0);


        return totalProfit;

    }
}