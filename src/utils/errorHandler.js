import { StatusCodes } from "http-status-codes";
import { ApiError } from "../error/index.js";

export default function errorHandler(err, _req, res, _next){
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            name: err.name,
            message: err.message,
            details: err.details,
        })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",  
    })
}