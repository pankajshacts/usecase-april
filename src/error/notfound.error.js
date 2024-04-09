import { StatusCodes } from "http-status-codes";
import ApiError from "./api.error.js";

export default class NotFoundError extends ApiError{
    constructor(resourceName, resourceValue){
        super(StatusCodes.NOT_FOUND, `The request resource ${resourceName} with value ${resourceValue} is not found.`, "Not_Found", {
            "Resource Name" : resourceName,
            "Resource Value": resourceValue
        });
    }
}