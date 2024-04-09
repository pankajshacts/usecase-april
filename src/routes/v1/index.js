import { Router } from "express";
import itemRouter from "./item.router.js";
import soldItemRouter from "./solditem.router.js";


const v1Router = Router();

v1Router.use("/items", itemRouter);
v1Router.use("/solditems", soldItemRouter);

export default v1Router;