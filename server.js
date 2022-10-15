import express from "express";
import mongoose from "mongoose";
import connectDB from "./db.js";
import http from "http";
import stockModel from "./stockModel.js";
import multer from "multer";
import { addBulkStocks, createStock, deleteStock } from "./stockController.js";

const PORT = 7000;
const app = express();
const httpServer = http.createServer(app);
app.use(express.json({limit: "25mb"}));
const upload = multer(); 

mongoose.connection.on("connected", async () => {
    try {
        console.log(`Database connection established`);
        
        httpServer.listen(PORT, "0.0.0.0", () => {
            try {
                console.log(`Server Running on Port ${PORT}`);
            } catch (error) {
                throw error;
            }
        });
    } catch (error) {
        console.log(`Startup failed : `, error.message);
        mainLogger.fatal("Startup failed : ", error.message);
    }
});

mongoose.connection.on("disconnected", async function () {
    try {
        console.log(`MongoDB connection dropped`);
        console.log("[MONGO DISCONNECT] Purposfully clean exiting the server...");
    } catch (error) {
        console.log(
            "Internal error in disconnect event MongoDB, Message : ",
            error.message
    );
}
});

app.post('/createStock',createStock);
app.delete('/deleteStock',deleteStock);
app.post('/addBulkStocks',upload.single("fileObj"),addBulkStocks);
app.delete('/deleteAllStocks',);
connectDB();




export default app;