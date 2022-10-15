import mongoose from "mongoose";

const stockModelSchema = mongoose.Schema(
  {
    Stock : {
        type : String,
        required : true
    },
    Date : {
        type : Date,
        required : true
    },
    Price : {
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
