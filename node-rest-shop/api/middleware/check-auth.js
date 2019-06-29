const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_kEY);
        next();
    }catch(error){
        return res.status(401).json({
            message : "Auth faildeee"
        })
    }
    
}