import mongoose from "mongoose";

const stockModelSchema = mongoose.Schema(
  {
    stock : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    closePrice : {
        type : Number,
        required : true 
    }
  }
);

const stockModel = mongoose.model(
  "stocks",
  stockModelSchema,
  "stocks"
);

export default stockModel;
