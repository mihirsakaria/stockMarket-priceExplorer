import stockModel from "./stockModel.js";
import { parseString } from "@fast-csv/parse";

export const createStock = async (req,res)=>{
    try{
        const payload = req.body;
        if(!payload || !payload.stock || !payload.date || !payload.closePrice || !payload.HighestPrice || !payload.LowestPrice || !payload.OpenPrice){
            return res.status(400).send({
                statusCode : 400,
                message : "Bad Request : Payload not appropriate"
            });
        }
        let createStockStatus = await stockModel.create(payload);
        if(!createStockStatus){
            return res.status(500).send({
                statusCode : 500,
                message : "Something went wrong in creating the stock as given"
            });
        }
        return res.status(202).send({
            statusCode : 202,
            message : `Stock successfully created with status : ${createStockStatus}`
        });

    }catch(error){
        console.log("Interna Server Error");
        return res.status(500).send({
            statusCode :500,
            message : `Internal Server Error : ${error.message}`
        });
    }
}

export const deleteStock = async(req,res)=>{
    try{
        const id = req.query.id;
        if(!id){
            return res.status(400).send({
                statusCode : 400,
                message : "Bad Request : id not given for deleting the stock"
            });
        }
        let doesGivenStockExist = await stockModel.findOne({_id : id});
        if(!doesGivenStockExist){
            return res.status(400).send({
                statusCode : 400,
                message : "Bad Request : the stock for given id does not exist"
            });
        }
        let deleteStockStatus = await stockModel.deleteOne({_id : id});
        if(!deleteStockStatus){
            return res.status(500).send({
                statusCode : 500,
                message : "Something went wrong in deleting the stock as given"
            });
        }
        return res.status(202).send({
            statusCode : 202,
            message : `Stock successfully deleted with status : ${JSON.stringify(deleteStockStatus)}`
        });
        // next();

    }catch(error){
        console.log("Interna Server Error");
        return res.status(500).send({
            statusCode :500,
            message : `Internal Server Error : ${error.message}`
        });
    }
}

export const addBulkStocks = async (req,res)=>{
    try{
        let fileObj = req.file;
        if(!fileObj){
            return res.status(400).send({
                statusCode : 400,
                message : "file not send"
            });
        }
        let fileData = [];
        parseString(fileObj.buffer, {
          headers: true,
          ignoreEmpty: true,
        })
          .on("error", (error) => {
            
            if (!res.headersSent)
              return res.status(500).send({
                Status: false,
                Message: error.message,
                StatusCode: 500
              });
          })
          .on("data", (data) => {
            try {
              let obj = {};
              if(data.SERIES == "EQ"){              
                obj.stock = data.SYMBOL;
                obj.date = new Date(data.TIMESTAMP);
                obj.OpenPrice = data.OPEN;
                obj.HighestPrice = data.HIGH;
                obj.LowestPrice = data.LOW;
                obj.closePrice = data.CLOSE;
                fileData.push(obj);
             } 
            } 
            catch (error) {
              logger.error(`[${reqId}] Error while parsing file `);
              if (!res.headersSent)
                return res.status(500).send({
                  Status: false,
                  Message: error.message,
                  StatusCode: 500,
                  Ref: reqId,
                });
            }
          })
          .on("end", async (rowCount) => {
            try {

              if (fileData.length == 0) {
                return res.status(400).send({
                  status: false,
                  StatusCode: 400,
                  message: "the given file is empty",
                });
              }
              let insertStatus = await stockModel.insertMany(fileData);
              if(!insertStatus){
                return res.status(500).send({
                    Status: false,
                    Message: "Internal Server Error : could not insert data in the database",
                    StatusCode: 500,
                    Ref: reqId,
                  });
              }
              return res.status(200).send({
                statsCode : 200,
                status : true,
                message : `Data succesfully inserted with status : ${JSON.stringify(insertStatus)}`
              });
            } catch (error) {
              if (!res.headersSent)
                return res.status(500).send({
                  Status: false,
                  Message: error.message,
                  StatusCode: 500,
                  Ref: reqId,
                });
            }
          });
    }
    catch(error){
        console.log("Interna Server Error");
        return res.status(500).send({
            statusCode :500,
            message : `Internal Server Error : ${error.message}`
        });
    }
}

export const deleteAllStocks = async(req,res)=>{
    try{
        let deleteStatus = await stockModel.deleteMany({});
        return res.status(200).send({
            statusCode : 200,
            message : `All stocks deleted with status : ${JSON.stringify(deleteStatus)}`
        });
    }   
    catch(error){
        return res.status(500).send({
            statusCode : 500,
            message : `Internal Server Error : ${error.message}`
        });
    }
}

export const getStockDetails = async(req,res)=>{
    try{
        let startTime = req.query.startTime;
        let endTime = req.query.endTime;
        let listOfStocks = req.query.listOfStocks;
        startTime = parseInt(startTime,10);
        endTime = parseInt(endTime,10);
        if(!startTime || !endTime || !listOfStocks){
            return res.status(400).send({
                statusCode : 400,
                message : "Bad Request : Either of starttime , endTime or listOfStocks is missing in parameters"
            })
        }
        if(startTime > endTime){
            return res.status(400).send({
                statsCode : 400,
                message : "Bad Request : Request not proper"
            });
        }
        let Data;
        let matchObject = { 
            $match : {
                date : {$gte : new Date(startTime),$lte : new Date(endTime)},
                }
            }
        if(listOfStocks){
            listOfStocks = listOfStocks.split(",");
            matchObject["$match"].stock = {$in : listOfStocks}; 
        }
        // console.log(new Date(startTime),new Date(endTime));
        Data = await stockModel.aggregate([matchObject, {
            $project: {
             _id: 0,
             __v: 0
            }
           }, {
            $group: {
             _id: '$stock',
             date: {
              $push: '$date'
             },
             closePrice: {
              $push: '$closePrice'
             }
            }
           }]);
        return res.status(200).send({
            statsCode : 200,
            data : Data
        });
    }
    catch(error){
        return res.status(500).send({
            statusCode : 500,
            message : `Internal Server Error : ${error.message}`
        });
    }
}

//list of stocks needed

export const listOfAllStocks = async(req,res)=>{
    try{
        let listOfAllStocks = await stockModel.distinct("stock");
        return res.status(200).send({
            statsCode : 200,
            data : listOfAllStocks.splice(0,100)
        });
    }
    catch(error){
        return res.status(500).send({
            statusCode : 500,
            message : `Internal Server Error : ${error.message}`
        });
    }
}

export const getSingleStockDetails = async (req,res)=>{
    try{
        let {stockName} = req.query;
        // startTime = parseInt(startTime,10);
        // endTime = parseInt(endTime,10);
        if(!stockName){
            return res.status(400).send({
                statusCode : 400,
                message : "Bad Request : Either of starttime , endTime or stockName is missing in parameters"
            })
        }
        // if(startTime > endTime){
        //     return res.status(400).send({
        //         statsCode : 400,
        //         message : "Bad Request : Request not proper"
        //     });
        // }
        let data = await stockModel.aggregate([{
            $match: {
            //  date: {
            //   $gte: new Date(startTime),
            //   $lte: new Date(endTime)
            //  },
             stock: stockName
            }
           }, {
            $project: {
             _id: 0,
             __v: 0
            }
           }, {
            $group: {
             _id: '$date',
             OpenPrice: {
              $push: '$OpenPrice'
             },
             HighestPrice: {
              $push: '$HighestPrice'
             },
             LowestPrice: {
              $push: '$LowestPrice'
             },
             closePrice: {
              $push: '$closePrice'
             }
            }
           },{
            $sort : {
                _id : 1
            }
           }]);
        let returnData = [];
        for(let i = 0 ;i < data.length;i++){
            let obj= {};
            obj.x = data[i]["_id"]//.split("T")[0];
            obj.y = [data[i]["OpenPrice"][0],data[i]["HighestPrice"][0],data[i]["LowestPrice"][0],data[i]["closePrice"][0]]
            returnData.push(obj);
        }   
        if(returnData.length == 0){
            return res.status(404).send({
                statusCode : 404,
                data : "No Data found in given range and time"
            })
        }
        return res.status(200).send({
            statusCode : 200,
            data : returnData
        });
    }
    catch(error){
        return res.status(500).send({
            statusCode : 500,
            message : `Internal Server Error : ${error.message}`
        });
    }
}