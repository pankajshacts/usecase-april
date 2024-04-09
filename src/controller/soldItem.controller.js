import { StatusCodes } from "http-status-codes";
import SoldItemRepository from "../repository/solditem.repository.js";
import SoldItemService from "../service/solditem.service.js";

const soldItemService = new SoldItemService(new SoldItemRepository());

export async function getAllSoldItems(req, res, next){
    try{
        
        const soldItems = await soldItemService.findAllSoldItems();
        
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns all sold items",
            data: soldItems
        })

    }catch(error){
        next(error);
    }
}

export async function getProfit(req, res, next){
    try{
        
        const profit = await soldItemService.calculateProfit(req.body.date);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns total profit",
            data: {
                profit,
            }
        });

    }catch(error){
        next(error);
    }
}

export async function getSoldItemById(req, res, next){
    try{
        
        const soldItem = await soldItemService.findSoldItemById(req.params.id);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns sold item",
            data: soldItem
        })

    }catch(error){
        next(error);
    }
}
