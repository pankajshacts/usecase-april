export default class ApiError extends Error{
    constructor(statusCode, message, name, detail){
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.details = detail;
    }
}