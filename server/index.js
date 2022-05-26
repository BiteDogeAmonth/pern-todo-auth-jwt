const express = require("express");
const app = express();
const cors = require("cors");
//middle ware
app.use(express.json());
app.use(cors());

//routes
//register and login
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(3000, () => {
    console.log("server is running on 3000");
});
