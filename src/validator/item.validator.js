import { BadRequestError } from "../error/index.js";
import {z} from "zod";
import mongoose from "mongoose";
import { dateUtils } from "../utils/index.js";
import { logger } from "../config/index.js";

export const createItemRequestSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a valid string of charcter(s)",
    }).min(3, {message: "Name should contain atleast 3 characters(s)"}),

    expiryDate: z.string().refine((value)=> {
        return dateUtils.isValidDate(value)
    }
    ,{
        message: "Expiry date should be a valid date",
    }),

    quantity: z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a valid number",
    }).gte(1, {message: "Quantity should be greater than 0"}),

    costPrice: z.number({
        required_error: "Cost price is required",
        invalid_type_error: "Cost price must be a valid number",
    }).gte(1, {message: "Cost price should be greater than 0"}),

    sellingPrice: z.number({
        required_error: "Selling price is required",
        invalid_type_error: "Selling price must be a valid number",
    }).gte(1, {message: "Selling price should be greater than 0"})

}).strict({
        message: "The request body has unrecognized item field"
});

export const updateItemRequestSchema = createItemRequestSchema.partial();

export const idSchema = z.string().refine((id)=>{
    return mongoose.isValidObjectId(id);
}, {
    message: "Id is not valid",
    path: ["id"]
})

export const sellItemRequestSchema = z.object({
    quantity: z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a valid number",
    }).gte(1, {message: "Quantity should be greater than or equal to 1"}), 
}).strict({
    message: "The request body has unrecognized field"
});

export const profitRequestSchema = z.object({
        date: z.string()
    }).strict({
        message: "The request body has unrecognized field"
    })
    .refine((value)=>{
        return dateUtils.isValidDate(value.date);
    }, {
        message: "Date should be a valid date",
        path: ["date"]
    });

export function validateRequestParams(schema){
    return function (req, _res, next){

        try{
            logger.info("Validator: validating request params");
            const parsedParams = schema.safeParse(req.params);
    
            if(!parsedParams.success){
                logger.error("Validator: validation failed");
                const {message, path} = parsedParams.error.errors[0];
                throw new BadRequestError(`Invalid ${path?path:"data"}`, message);
            }
    
            req.params = parsedParams.data;
            logger.info("Validator: validation success");
            next();
    
        }catch(error){
            logger.error(error);
            next(error);
        }
    }
}


export function validateRequestBody(schema){

    return function (req, _res, next){
        try{
            logger.info("Validator: validating request body");
            const parsedBody = schema.safeParse(req.body);
    
            if(!parsedBody.success){
                logger.error("Validator: validation failed");
                const {message, path} = parsedBody.error.errors[0];
                throw new BadRequestError(`Invalid ${path?path:"data"}`, message);
            }
    
            req.body = parsedBody.data;
            logger.info("Validator: validation success");
            next();
    
        }catch(error){
            logger.error(error);
            next(error);
        }
    }
}
