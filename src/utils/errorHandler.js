import { StatusCodes } from "http-status-codes";
import serverConfig from "../config/server.config.js";
import ApiError from "../error/api.error.js";

export default function errorHandler(err, _req, res, _next){
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            name: err.name,
            message: err.message,
            details: err.details,
            stack: serverConfig.NODE_ENV=="development"?err.stack:""
        })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",  
        stack : serverConfig.NODE_ENV=="development"? err.stack: "",
    })
}