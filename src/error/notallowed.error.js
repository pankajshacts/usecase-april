import { StatusCodes } from "http-status-codes";
import ApiError from "./api.error.js";

export default class MethodNotAllowed extends ApiError{
    constructor(message, detail){
        super(StatusCodes.METHOD_NOT_ALLOWED, message, "Method_Not_Allowed", detail);
    }
}