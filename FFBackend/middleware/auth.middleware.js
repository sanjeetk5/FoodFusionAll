const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decode=jwt.verify(token.split(' ')[1],'innorik');
        if(decode){
            next();
        }else{
            res.status(501).send({"error":"invalid token"});
        }
    }else{
        res.status(401).send({"failed":"please login!"});
    };
};

module.exports={auth};