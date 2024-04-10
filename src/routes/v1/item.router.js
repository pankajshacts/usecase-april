import { Router } from "express";
import {ItemController} from "../../controller/index.js";
import { createItemRequestSchema, idSchema, sellItemRequestSchema, updateItemRequestSchema, validateRequestBody, validateRequestParams } from "../../validator/index.js";

const itemRouter = Router();

itemRouter.post("/", validateRequestBody(createItemRequestSchema), ItemController.createItem);
itemRouter.post("/itemid/:id", 
validateRequestParams(idSchema), validateRequestBody(sellItemRequestSchema), 
ItemController.sellItemById)

itemRouter.get("/", ItemController.getAllItems);
itemRouter.get("/itemid/:id", validateRequestParams(idSchema), ItemController.getItemById);
itemRouter.get("/expireditems", ItemController.getAllExpiredItems);

itemRouter.delete("/itemid/:id", validateRequestParams(idSchema), ItemController.deleteItemById);
itemRouter.delete("/expireditems", ItemController.deleteExpiredItems);


itemRouter.patch("/itemid/:id",
validateRequestParams(idSchema),
validateRequestBody(updateItemRequestSchema),
ItemController.updateItemById);


export default itemRouter;


