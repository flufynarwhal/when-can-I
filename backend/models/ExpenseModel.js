const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 8,
      trim: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    description: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expense", ExpenseSchema);
