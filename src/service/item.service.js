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

        const sellingDate = new Date();
        
        const item = await this.itemRepository.findItemById(itemId);

        if(item == null){
            throw new NotFoundError("item", itemId);
        }

        if(item.expiryDate <= sellingDate){
            throw new MethodNotAllowed("Not allowed to perform selling operation", {
                expiryDate: item.expiryDate,
                sellingDate: sellingDate,
            })
        }

        await this.itemRepository.sellItem(item, quantity, sellingDate);

        return;
    }


    async deleteExpiredItems(){
        await this.itemRepository.deleteExpiredItems();
        return;
    }

    async createItem(item){
        item.expiryDate = new Date(item.expiryDate);
        return await this.itemRepository.createItem(item);
    }

    async findAllItems(){
        return await this.itemRepository.findAllItems();
    }

    async findAllExpiredItems(){
        return await this.itemRepository.findAllExpiredItems();
    }

    async findItemById(id){
        const item = await this.itemRepository.findItemById(id);

        if(item == null){
            throw new NotFoundError("item", id);
        }

        return item;
    }
}