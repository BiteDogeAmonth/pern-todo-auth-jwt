const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req, res) => {
    try {
        const user = await pool.query("select user_name from users where user_id = $1", [req.user]); 
        res.json(user.rows[0].user_name);
    } catch (e) {
        console.error(e.message);
        return res.status(500).send("Server Error");       
    }
}); 

router.post("/todos", authorization, async(req, res) => {
    try {

        const {notes} = req.body;
        const response = await pool.query("insert into messages (notes, u_id) values($1, $2)", [notes, req.user])
        res.json("Insert Successfully");

    } catch (err) {
        console.error(err.message);
    }
})


router.get("/todos", authorization, async(req, res) => {
    try {
        const todos = await pool.query("select * from messages where u_id = $1", [req.user]);
        res.json(todos.rows);
    } catch (error) {
        console.error(e.message);
    }
});

router.get("/todos/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const todos = await pool.query("select * from messages where u_id = $1 and m_id = $2", [req.user, id]);
        res.json(todos.rows);
    } catch (error) {
        console.error(e.message);
    }
});


router.delete("/todos/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const todos = await pool.query("delete from messages where u_id = $1 and m_id = $2", [req.user, id]);
        res.json("Delete Successfully");
    } catch (err) {
        console.error(err.message);
    }
});

router.put("/todos/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const {notes} = req.body;
        const response = await pool.query("update messages set notes=$1 where u_id=$2 and m_id=$3", [notes, req.user, id]);
        res.json("Note Updated!");
    } catch (err) {
        console.error(err.message);
    }
});


module.exports = router;