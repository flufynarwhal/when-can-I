const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const { db } = require("./database/db.js");
const app = express();
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

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
