import mongoose from "mongoose";
const CarsSchema=mongoose.Schema({
    Name:String,
    Year:Number,
    Color:String,
    Rate:Number,
    Regno:String,
    Carimg:String,
},
{
    timestamps:true
})
const Cars=mongoose.model("CarsCollections",CarsSchema)
export default Cars;