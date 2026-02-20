
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwt_generator');
const validInfo = require("../middlewares/validinfo");
const autorization = require("../middlewares/authorization");
// const router = express.Router();
const pool = require('../db');
//registering

router.post('/register', validInfo, async (req, res) => {
    try {
        // 1. destructure the req body (name,email,passwd)
        const { name, email, password } = req.body;

        // 2. check if user exists (if user exists then through error)
        const user = await pool.query("select * from users where user_email=$1", [email]);
        if (user.rows.length != 0) {
            return res.status(401).send({ message: "user already exists" });
        }

        // 3. bcrypt the password 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // 4. enter the new user to the DB 
        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) values ($1,$2,$3) returning * ", [name, email, bcryptPassword]);

        // 5. generating jwt token 

        const token = jwtGenerator(newUser.rows[0]);

        console.log(token);
        res.send({ token })
    } catch (err) {
        console.error(err.message);

        res.status(500).send({ message: "Internal Server Error" })
    }
});


router.post('/login', validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query('select * from users where user_email = $1', [email]);
        if (user.rows.length === 0) {
            console.log("user doesn't exist");
            res.status(401).send({ error: "Password or email is incorrect" });
        }

        await bcrypt.compare(password, user.rows[0].user_password).then(function (result) {
            if (!result) {
                return res.status(401).json("password or email is incorrect");
            }

        });

        const token = jwtGenerator(user.rows[0].user_id);

        res.send({ token });

    } catch (err) {
        console.error(err.message);

        res.status(500).send({ message: "Internal Server Error" })
    }
});

router.get("/is-verify", autorization, async (req, res) => {
    try {

        res.json(true);

    } catch (err) {
        console.error(err.message);

        res.status(500).send({ message: "Internal Server Error" })
    }
});


module.exports = router;
