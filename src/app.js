require("dotenv").config();
const express = require("express");
require("./db/conn");
const app = express();

const userRouter = require("./routers/user");

const port = process.env.PORT || 3000;
app.use(express.json());

// Routers of CRUD API
app.use(userRouter);

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
