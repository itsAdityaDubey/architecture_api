const jwt  = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, process.env.jwt_secret);
        next();
    } catch (err) {
        res.status(400).send(err);
    }
}