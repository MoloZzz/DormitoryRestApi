const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    
    if(req.method === "OPTIONS"){
     next();
    }

    try{

        const token = req.headers.authorization.split(' ')[1]; //"tokename somename"

        if(!token){
            return res.status(401).json({message: "Користувач не авторизований"});
        }

        const decoced = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoced;
        next();

    }catch(e){
       res.status(401).json({message: "Користувач не авторизований"});

    }
}