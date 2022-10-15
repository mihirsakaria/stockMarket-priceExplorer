import stockModel from "./stockModel.js";

export const createStock = async (req,res)=>{
    try{
        const payload = req.body;
        if(!payload || !payload.Stock || !payload.Date || !payload.Price){
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
        // next();

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
// export const addBulkStocks = async(req,res