const mongoose =require("mongoose");
require("dotenv").config();

const dbConnection=async()=>{
    const url=process.env.MONGO_URL;

    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("DB connected sucessfully.."))
    .catch((error)=>{
        console.error(error);
        console.log("error in DB connection..")
    })
}

module.exports=dbConnection;