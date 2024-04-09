import mongoose from "mongoose";
import serverConfig from "./server.config.js";

export default async function dbConnect(){
    try{
        await mongoose.connect(serverConfig.DATABASE_URL);
    }catch(error){
        console.log("Database connection failed");
        console.log(error);
        process.exit(1);
    }
}