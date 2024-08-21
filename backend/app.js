const express = require("express");
const cors = require("cors");
const { db } = require("./database/db.js");
const app = express();
require("dotenv").config({ path: "./.env" });
const transactionRouter = require("./routes/transactions.js");

const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", transactionRouter);

app.get("/", (req, res) => {
  res.send("When Can I retired?!?!");
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
