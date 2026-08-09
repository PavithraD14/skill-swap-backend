const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try{

        const authHeaders = req.headers.authorization;
     
        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(404).json({message: "Token not Found"});
        }
        
        const token = authHeaders.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        next();

    }catch(err){
        res.status(401).json({message: "Unauthorized: Invalid token"});
    }
};

module.exports = authMiddleware;