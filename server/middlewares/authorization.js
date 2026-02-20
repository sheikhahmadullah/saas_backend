
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            res.status(403).json("You're not authorized");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtsecret);

        req.user = payload.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(403).json("You're not authorized");
    }


}