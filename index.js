import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { dbConnection } from "./DB/connection.js";
import { allRoutes } from "./src/modules/routes.js";
import { AppError } from './src/utilties/AppError.js';
import cors from 'cors';
const app= express();
const port =6000;

app.use(cors());


app.use(express.json());
app.use("/uploads",express.static("uploads"));
allRoutes(app);
dbConnection();

app.use("*",(req,res,next)=>{
    next(new AppError("URL not found",404));
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode).json({message:err.message});
  });
app.listen(process.env.PORT || port,()=>{
    console.log(`srever rnning on port ${port}`);
    
});


