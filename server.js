const express=require("express");
const app=express();
require("dotenv").config();
const dbConnection=require("./config/dbConection");
const cloudinaryConnect=require("./config/cludinaryConnect");
const fileUpload=require("express-fileupload");
const cors=require("cors");
dbConnection();
cloudinaryConnect();


const PORT=process.env.PORT || 4001;

// middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors());

// mounting
const FileUploadRoute=require("./route/ArchRoute");
app.use("/api/v1",FileUploadRoute);

app.listen(PORT,()=>{
    console.log(`App is running at port no ${PORT}`);
})

