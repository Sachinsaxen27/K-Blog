const mongoose=require('mongoose')

const {Schema}=mongoose

const Userschema= new Schema({
    name: {
        type: String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    username:{
        type:String,unique:true,required:true
    },
    image:{
        type:String
    }
})
module.exports=mongoose.model('userlogin',Userschema)