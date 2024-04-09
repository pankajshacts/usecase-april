import { logger } from "../config/index.js";
import { BadRequestError, MethodNotAllowed, NotFoundError } from "../error/index.js";

export default class ItemService{
    
    constructor(itemRepository){
        this.itemRepository = itemRepository;
    }

    async deleteItemById(itemId){
        logger.info("ItemService: fetching item by id");
        const item = await this.itemRepository.findItemById(itemId);
        
        if(item == null){
            logger.error("ItemService: item not found by id");
            throw new NotFoundError("item", itemId);
        }

        logger.info("ItemService: deleting item by id");
        
        await this.itemRepository.deleteItemById(itemId);

        logger.info("ItemService: deleted item by id");
        return;
    }

    async updateItemById(itemId, itemData){

        logger.info("ItemService: fetching item by id");
        
        const item = await this.itemRepository.findItemById(itemId);

        logger.info("ItemService: fetched item by id");
        
        if(item == null){
            logger.error("ItemService: Item not found by id");
            throw new NotFoundError("item", itemId);
        }
        
        logger.info("ItemService: updating item by id");

        await this.itemRepository.updateItemById(itemId, itemData);
        
        logger.info("ItemService: updated item by id");
        return;
    }

    async sellItemById(itemId, quantity){

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
        logger.info("ItemService: selling item");

        await this.itemRepository.sellItem(item, quantity, sellingDate);
        
        logger.info("ItemService: sold item");
        return;
    }

    async deleteExpiredItems(){
        logger.info("ItemService: deleting all expired items");
        
        await this.itemRepository.deleteExpiredItems();

        logger.info("ItemService: deleted all expired items");
        return;
    }

    async createItem(item){
        
        const currentDate = new Date();
        item.expiryDate = new Date(item.expiryDate);
        
        if(item.expiryDate < currentDate){
            logger.error("ItemService: Expiry date should be greater than today's date");
            throw new BadRequestError("Invalid expiry date", {
                msg: "Expiry date should be greater than today's date",
                expiryDate: item.expiryDate 
            })
        }
        
        logger.info("ItemService: creating item");
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