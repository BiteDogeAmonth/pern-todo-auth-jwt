const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(403).json("unauthorizaed");
        }

        const payload = jwt.verify(jwtToken, "dhkahdkha");
        req.user = payload.user;
        next();

    } catch (e) {
        console.log(e.message);
        return res.status(403).json("unauthorizaed");
    }


};