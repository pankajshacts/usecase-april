import express from "express";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "./utils/index.js";
import apiRouter from "./routes/index.js";
import { serverConfig, dbConnect, logger } from "./config/index.js"

function createApp(){
    
    logger.info("Setup express application")
    const PORT = serverConfig.PORT;
    const app = express();

    logger.info("Setup middlewares");
    app.use(express.json());
    app.use(express.text());
    app.use(express.urlencoded({extended:true}));

    logger.info("Setup api routes");
    app.use("/api", apiRouter);

    app.get("/healthcheck", function healtcheck(_req, res){
        return res.status(StatusCodes.OK).json({
            message: "server is healthy"
        })
    })

    logger.info("Setup error handler")
    app.use(errorHandler);

    dbConnect().then(()=>{
        logger.info("Database connected");
        app.listen(PORT, function start(){
            logger.info(`Server is running on ${PORT}`);
        });
    }).catch(()=>{
        logger.info("Process exit");
        process.exit(1);
    })
}

createApp();