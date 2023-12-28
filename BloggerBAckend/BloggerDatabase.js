const mongoose=require('mongoose')
const mongooseUrl="mongodb://127.0.0.1:27017/K-Blog"
const connecttomongo=()=>{
    mongoose.connect(mongooseUrl,console.log("You have been Successfully Connected with K-Blog at MongoDB"))
}
module.exports=connecttomongo;