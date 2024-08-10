const express = require("express");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/Income");
const router = express.Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome);

module.exports = router;
