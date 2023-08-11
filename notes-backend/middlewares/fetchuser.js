const jwt = require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    const token=req.header('tkn');
    if(!token){
        res.status(401).send({error:'Provide a token'});
    }
    try {
        const data=jwt.verify(token,process.env.JWT_SECRET);
        req.user=data.user;
        next();
    } catch {
        res.status(401).send({error:'token is invalid'});
    }
}

module.exports=fetchuser;