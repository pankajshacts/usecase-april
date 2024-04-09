import BadRequestError from "../error/badrequest.error.js";
import {z} from "zod";
import mongoose from "mongoose";
import isValidDate from "../utils/isValidDate.js";

export const createItemRequestSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a valid string of charcter(s)",
    }).min(3, {message: "Name should contain atleast 3 characters(s)"}),

    expiryDate: z.coerce.date({
        required_error: "Expiry date is required",
        invalid_type_error: "Expiry date should follow a valid date format",
    }).min(new Date(), {message: "Expiry date should be greater than today's date"}),

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
        return isValidDate(value.date);
    }, {
        message: "Invalid date! Supported date format: [MM/DD/YYYY, YYYY/MM/DD]",
        path: ["date"]
    }).refine(value=>new Date(value.date) <= new Date(), {
        message: "Date must be atleast today's date",
        path: ["date"]
});

export function validateRequestParams(schema){
    return function (req, _res, next){

        try{
            const parsedParams = schema.safeParse(req.params);
    
            if(!parsedParams.success){
                const {message, path} = parsedParams.error.errors[0];
                throw new BadRequestError(`Invalid ${path?path:"data"}`, message);
            }
    
            req.params = parsedParams.data;
            next();
    
        }catch(error){
            next(error);
        }
    }
}


export function validateRequestBody(schema){

    return function (req, _res, next){
        try{

            const parsedBody = schema.safeParse(req.body);
    
            if(!parsedBody.success){
                const {message, path} = parsedBody.error.errors[0];
                console.log(parsedBody.error)
                throw new BadRequestError(`Invalid ${path?path:"data"}`, message);
            }
    
            req.body = parsedBody.data;
            next();
    
        }catch(error){
            next(error);
        }
    }
}
