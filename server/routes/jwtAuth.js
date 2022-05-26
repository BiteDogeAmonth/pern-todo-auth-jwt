const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../util/jwtGen");
const verifyInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//register
router.post("/register", verifyInfo, async (req, res) => {
    // destruct the input json object
    // check if the user exists
    // Bcrypt password
    // insert new use to database
    // generate a new jwt token
    try {
        const {name, email, password} = req.body;
        const user_exist = await pool.query("select * from users where user_email = $1", [email]);
        
        if (user_exist.rows.length !== 0) {
            return res.status(401).json("Email already registered");
        }
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcyptedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("insert into users (user_name, user_email, user_password) values ($1, $2, $3)", [name, email, bcyptedPassword]);
        
        const token = jwtGenerator(email);

        res.json({token});

    } catch (e) {
        console.error(e.message);
        return res.status(500).json("Server Error");
    }
});

router.post("/login", verifyInfo, async (req, res) => {
    // destruct the input json object
    // check if the user exists
    // Bcrypt password
    // insert new use to database
    // generate a new jwt token
    try {
        const {email, password} = req.body;
        const user_exist = await pool.query("select * from users where user_email = $1", [email]);
        
        if (user_exist.rows.length === 0) {
            return res.status(401).json("Email has not been registered");
        }
        
        const validPassword = await bcrypt.compare(password, user_exist.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Password is incorrect");
        }
        
        const token = jwtGenerator(user_exist.rows[0].user_id); 
        res.json({token});

    } catch (e) {
        console.error(e.message);
        return res.status(500).json("Server Error");
    }
});

router.get("/verify", authorization, async(req, res) => {
    try {
        res.json(true);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json("Server Error");
    }
});














module.exports = router;