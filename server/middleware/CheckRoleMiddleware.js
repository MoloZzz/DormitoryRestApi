const jwt = require("jsonwebtoken");

module.exports = function(role){ 
    return function(req,res,next){
    
    if(req.method === "OPTIONS"){
     next();
    }

    try{

        const token = req.headers.authorization.split(' ')[1]; //"tokename asdsadasd"

        if(!token){
            return res.status(401).json({message: "Користувач не авторизований"});
        }

        const decoced = jwt.verify(token, process.env.SECRET_KEY);

        if(decoced.role !== role){
            return res.status(403).json("Немає доступу");
        }
        req.user = decoced;
        next();

    }catch(e){
       res.status(401).json({message: "Користувач не авторизований"});

    }
}
}