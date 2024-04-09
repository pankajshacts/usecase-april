import mongoose from "mongoose";
import logger from "./logger.config.js";
import serverConfig from "./server.config.js";

export default async function dbConnect(){
    try{
        await mongoose.connect(serverConfig.DATABASE_URL);
    }catch(error){
        logger.error("Database connection failed");
        logger.error(error);
        process.exit(1);
    }
}