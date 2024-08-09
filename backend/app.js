const express = require("express");
const cors = require("cors");
const { db } = require("./database/database.js");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// routes

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
