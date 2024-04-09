import { StatusCodes } from "http-status-codes";
import { logger } from "../config/index.js";
import { SoldItemRepository } from "../repository/index.js";
import { SoldItemService } from "../service/index.js";

const soldItemService = new SoldItemService(new SoldItemRepository());

export async function getAllSoldItems(req, res, next){
    try{
        
        logger.info("SoldItemController: fetching all sold items");

        const soldItems = await soldItemService.findAllSoldItems();
        
        logger.info("SoldItemController: fetched all sold items");
        logger.info("SoldItemController: sending http response with list of sold items");


        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns all sold items",
            data: soldItems
        })

    }catch(error){
        logger.error("SoldItemController: Not able to fetch list of items");
        logger.error(error);
        next(error);
    }
}

export async function getProfit(req, res, next){
    try{
        logger.info("SoldItemController: fetching profit by date");

        const profit = await soldItemService.calculateProfit(req.body.date);

        logger.info("SoldItemController: fetched profit by date");
        logger.info("SoldItemController: sending response with total profit");


        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns total profit",
            data: {
                profit,
            }
        });

    }catch(error){
        logger.error("SoldItemController: Not able to fetch profit");
        logger.error(error);
        next(error);
    }
}

export async function getSoldItemById(req, res, next){
    try{
        logger.info("SoldItemController: fetching sold item by id");

        const soldItem = await soldItemService.findSoldItemById(req.params.id);

        logger.info("SoldItemController: fetched sold item by id");
        logger.info("SoldItemController: sending http response with sold item");

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully returns sold item",
            data: soldItem
        })

    }catch(error){
        logger.error("SoldItemController: Not able to fetch sold item by id");
        logger.error(error);
        next(error);
    }
}
