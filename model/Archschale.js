const mongoose=require("mongoose");

const ArchSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    assigndTo:{
        type:String,
    },
    assigndBy:{
        type:String,
    },
    dueDate:{
        type:Date,
        default: new Date().toLocaleString(),
    },
    project:{
        type:String,
    },
    description:{
        type:String,
    },
    comment:{
        type:String,
    },
    changeDate:{
        type: Date,
        default: new Date().toLocaleString(),
    },
    progress:{
      type:String,
    },
    imageUrl:{
        type:String,
    },
    fileSize:{
        type:String,
    },
    email:{
        type:String,
    }

});
ArchSchema.pre('save', function (next) {
    // Check if 'comment' field is an array
    if (Array.isArray(this.comment)) {
      // Convert array to a string (you can adjust this logic as needed)
      this.comment = this.comment.join(', '); // Join array elements with a comma (adjust as needed)
  
      // Alternatively, if you want to keep the array structure, you can stringify it
      // this.comment = JSON.stringify(this.comment);
    }
  
    next();
  });
module.exports=mongoose.model("File",ArchSchema);