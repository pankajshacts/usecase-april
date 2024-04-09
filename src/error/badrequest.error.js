import { StatusCodes } from "http-status-codes";
import ApiError from "./api.error.js";

export default class BadRequestError extends ApiError{
    constructor(message, detail){
        super(StatusCodes.BAD_REQUEST, message, "Bad_Request", detail);
    }
}