import { Router } from "express";
import { SoldItemController} from "../../controller/index.js";
import { idSchema, profitRequestSchema, validateRequestBody, validateRequestParams } from "../../validator/index.js";

const soldItemRouter = Router();

soldItemRouter.get("/", SoldItemController.getAllSoldItems);

soldItemRouter.get("/itemid/:id", validateRequestParams(idSchema), SoldItemController.getSoldItemById);

soldItemRouter.post("/profit", validateRequestBody(profitRequestSchema), SoldItemController.getProfit);

export default soldItemRouter;