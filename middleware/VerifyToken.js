import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    console.log("Verifying Token")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)      
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        if(err) return res.send(err);
        req.adminUsername = decoded.adminUsername;
        next();
    })
}