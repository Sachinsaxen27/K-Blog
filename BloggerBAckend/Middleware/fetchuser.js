const jwt=require('jsonwebtoken');
const jwt_Sign ="Sachin_Saxena"
const fetchuser = async (req,res,next)=>{
    try {
        const token= req.header('auth-token')
        if(!token){
            return res.status(500).json({error:"Incorrect information"})
        }
        const datas=jwt.verify(token,jwt_Sign);
        req.user=datas.user.id
        next();
    } catch (error) {
        return res.status(401).json({error:"Incorrect"})   
    }
}

module.exports = fetchuser;