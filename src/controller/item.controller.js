import { StatusCodes } from "http-status-codes";
import ItemRepository from "../repository/item.repository.js";
import ItemService from "../service/item.service.js";

const itemService = new ItemService(new ItemRepository());

export async function updateItemById(req, res, next){
    try{

        await itemService.updateItemById(req.params.id, req.body);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated item",
        })

    }catch(error){
        next(error);
    }
}

export async function createItem(req, res, next){
    try{

        const item = await itemService.createItem(req.body);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created item",
            data: item,
        })

    }catch(error){
        next(error);
    }
}

export async function getAllItems(_req, res, next){
    try{

        const items = await itemService.findAllItems();

        return res.status(StatusCodes.OK).json({
            success: true,
            messgae: "Successfully returns all items",
            data : items,
        })

    }catch(error){
        next(error);
    }
}

export async function getItemById(req, res, next){
    try{

        const item = await itemService.findItemById(req.params.id);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns one item",
            data: item
        })

    }catch(error){
        next(error);
    }
}

export async function deleteItemById(req, res, next){
    try{

        await itemService.deleteItemById(req.params.id);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted item",
        })

    }catch(error){
        next(error);
    }
}

export async function deleteExpiredItems(_req, res, next){
    try{
        await itemService.deleteExpiredItems();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted all expired items",
        })

    }catch(error){
        next(error);
    }
}

export async function getAllExpiredItems(_req, res, next){
    try{

        const expiredItems = await itemService.findAllExpiredItems();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns all expired items",
            data: expiredItems
        })

    }catch(error){
        next(error);
    }
}

export async function sellItemById(req, res, next){
    try{

        await itemService.sellItemById(req.params.id, req.body.quantity);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: `Successfully sold ${quantity} item(s)`,
        })
        
    }catch(error){
        next(error);
    }
}