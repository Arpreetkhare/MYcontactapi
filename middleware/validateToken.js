const { verify } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");

const validateToken = async (req,res,next) =>{
    let token ;
    let authHeader = req.headers.authorization || req.headers.authentication;

    if (authHeader && authHeader.startsWith("Bearer")){

        token= authHeader.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY , (err,decoded) => {
            if (err) {
                res.status(401);
            }

            if (!decoded || !decoded.user) {
                return res.status(401).json({ message: "Token is missing user information!" });
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            return res.status(401).json({ message: "Token missing from header!" });
    
        }
    }
};

module.exports={
    validateToken
}