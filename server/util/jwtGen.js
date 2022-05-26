const jwt = require("jsonwebtoken");

const jwtGenerator = (user_email) => {
    const payload = {
        user: user_email
    }

    return jwt.sign(payload, "dhkahdkha", {expiresIn:"1hr"});
}

module.exports = jwtGenerator;