import express from "express";
import StatusCode from "http-status-codes";
import errorHandler from "./utils/errorHandler.js";
import apiRouter from "./routes/index.js";
import {serverConfig, dbConnect} from "./config/index.js"

function createApp(){
    const PORT = serverConfig.PORT;
    const app = express();

    app.use(express.json());
    app.use(express.text());
    app.use(express.urlencoded({extended:true}));

    app.use("/api", apiRouter);

    app.get("/healthcheck", function healtcheck(_req, res){
        return res.status(StatusCode.OK).json({
            message: "server is healthy"
        })
    })

    app.use(errorHandler);

    app.listen(PORT, async function start(){
        console.log(`Server is running on PORT=${PORT}`);
        await dbConnect();
        console.log(`Database connected`);
    })
}

createApp();