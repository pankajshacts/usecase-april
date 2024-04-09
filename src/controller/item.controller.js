import { StatusCodes } from "http-status-codes";
import logger from "../config/logger.config.js";
import ItemRepository from "../repository/item.repository.js";
import ItemService from "../service/item.service.js";

const itemService = new ItemService(new ItemRepository());

export async function updateItemById(req, res, next){
    try{
        logger.info("ItemController: updating item by id")
        await itemService.updateItemById(req.params.id, req.body);

        logger.info("ItemController: updated item by id");
        logger.info("ItemController: sending http response with success message");

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated item",
        })

    }catch(error){
        logger.error("ItemController: Not able to update item");
        logger.error(error);
        next(error);
    }
}

export async function createItem(req, res, next){
    try{
        logger.info("ItemController: creating item");
        const item = await itemService.createItem(req.body);

        logger.info("ItemController: item created");
        logger.info("ItemController: sending http response with newly created item");

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created item",
            data: item,
        })

    }catch(error){
        logger.error("ItemController: Not able to create item");
        logger.error(error);
        next(error);
    }
}

export async function getAllItems(_req, res, next){
    try{

        logger.info("ItemController: fetching all items");

        const items = await itemService.findAllItems();

        logger.info("ItemController: fetched all items");
        logger.info("ItemController: sending http response with list of items");

        return res.status(StatusCodes.OK).json({
            success: true,
            messgae: "Successfully returns all items",
            data : items,
        })

    }catch(error){
        logger.error("ItemController: Not able to fetch all items");
        logger.error(error);
        next(error);
    }
}

export async function getItemById(req, res, next){
    try{

        logger.info("ItemController: fetching item by id");

        const item = await itemService.findItemById(req.params.id);

        logger.info("ItemController: fetched item by id");
        logger.info("ItemController: sending http response with item");

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns one item",
            data: item
        })

    }catch(error){
        logger.error("ItemController: Not able to fetch item by id");
        logger.error(error);
        next(error);
    }
}

export async function deleteItemById(req, res, next){
    try{

        logger.info("ItemController: deleting item by id");
        
        await itemService.deleteItemById(req.params.id);

        logger.info("ItemController: deleted item");
        logger.info("ItemController: sending http response with success message");

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted item",
        })

    }catch(error){
        logger.error("ItemController: Not able to delete item by id");
        logger.error(error);
        next(error);
    }
}

export async function deleteExpiredItems(_req, res, next){
    try{
        logger.info("ItemController: deleting all expired items");
        
        await itemService.deleteExpiredItems();

        logger.info("ItemController: deleted all expired items");
        logger.info("ItemController: sending http response with success message");

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted all expired items",
        })

    }catch(error){
        logger.error("ItemController: Not able to delete all expired items");
        logger.error(error);
        next(error);
    }
}

export async function getAllExpiredItems(_req, res, next){
    try{

        logger.info("ItemController: fetching all expired items");

        const expiredItems = await itemService.findAllExpiredItems();

        logger.info("ItemController: fetched all expired items");
        logger.info("ItemController: sending http response with list of expired items");

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns all expired items",
            data: expiredItems
        })

    }catch(error){
        logger.error("ItemController: Not able to fetch all expired items");
        logger.error(error);
        next(error);
    }
}

export async function sellItemById(req, res, next){
    try{

        logger.info("ItemController: selling item by id");

        await itemService.sellItemById(req.params.id, req.body.quantity);

        logger.info("ItemController: sold item by id");
        logger.info("ItemController: sending http resposne with success message");

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: `Successfully sold ${quantity} item(s)`,
        })
        
    }catch(error){
        logger.error("ItemController: Not able to sell item by id");
        logger.error(error);
        next(error);
    }
}