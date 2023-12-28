const mongoose=require("mongoose")
const {Schema}=mongoose
const BlogSchema=new Schema({
    blogid:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userlogin"
    },
    author:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    publishedAt:{
        type:String
    },
    image:{
        type:String
    },
    category:{
        type:String
    },
})
module.exports=mongoose.model('blogadd',BlogSchema)