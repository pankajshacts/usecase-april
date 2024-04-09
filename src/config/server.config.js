import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || "3000",
    NODE_ENV: process.env.NDOE_ENV || "development",
    DATABASE_URL: process.env.DATABASE_URL,
}