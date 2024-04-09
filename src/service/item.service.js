import logger from "../config/logger.config.js";
import MethodNotAllowed from "../error/notallowed.error.js";
import NotFoundError from "../error/notfound.error.js";

export default class ItemService{
    
    constructor(itemRepository){
        this.itemRepository = itemRepository;
    }

    async deleteItemById(itemId){
        const item = await this.itemRepository.findItemById(itemId);
        
        if(item == null){
            throw new NotFoundError("item", itemId);
        }

        await this.itemRepository.deleteItemById(itemId);

        return;
    }

    async updateItemById(itemId, itemData){

        const item = await this.itemRepository.findItemById(itemId);

        if(item == null){
            throw new NotFoundError("item", itemId);
        }

        await this.itemRepository.updateItemById(itemId, itemData);

        return;
    }

    async sellItemById(itemId, quantity){

        logger.info("ItemService: selling item by id");
        const sellingDate = new Date();
        
        logger.info("ItemService: fetching item by id")
        const item = await this.itemRepository.findItemById(itemId);

        if(item == null){
            logger.error("ItemService: item not found by id");
            throw new NotFoundError("item", itemId);
        }

        logger.info("ItemService: item found by id");

        if(item.expiryDate <= sellingDate){
            logger.error("ItemService: cannot sell expired item");
            throw new MethodNotAllowed("Not allowed to perform selling operation", {
                expiryDate: item.expiryDate,
                sellingDate: sellingDate,
            })
        }

        await this.itemRepository.sellItem(item, quantity, sellingDate);
        logger.info("ItemService: sold item");
        return;
    }


    async deleteExpiredItems(){
        logger.info("ItemService: deleting all expired items");
        await this.itemRepository.deleteExpiredItems();
        return;
    }

    async createItem(item){
        logger.info("ItemService: creating item");

        item.expiryDate = new Date(item.expiryDate);
        return await this.itemRepository.createItem(item);
    }

    async findAllItems(){
        logger.info("ItemService: fetching all items");
        return await this.itemRepository.findAllItems();
    }

    async findAllExpiredItems(){
        logger.info("ItemService: fetching all expired items");
        return await this.itemRepository.findAllExpiredItems();
    }

    async findItemById(id){
        logger.info("ItemService: fetching item by id");
        const item = await this.itemRepository.findItemById(id);

        if(item == null){
            logger.error("ItemService: item not found by id");
            throw new NotFoundError("item", id);
        }

        logger.info("ItemService: item found by id");
        return item;
    }
}