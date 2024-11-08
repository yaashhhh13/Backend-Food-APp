const jwt = require("jsonwebtoken");
const protect = async(req, res, next) => {
    try {
        // console.log("started middleware process")

        if (!req.headers || !req.headers.authorization) {
            return res.status(403).send({
                message: "Authorization headers not found",
                success: false
            });
        }
        
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err){
                return res.status(200).send({
                    message: "Auth failed",
                    success: false
                })
            } else {
                req.body.userId = decode.id;
                next()
            }
        })
        
        // console.log("ended middleware process")
    } catch (error) {
        console.log(error)
        console.error(error)
        return res.status(500).send({
            success: false,
            message: `Auth error`,
        })
    }
}

module.exports = protect