const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
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
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
      default: Date.now,
    },
    category: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("income", IncomeSchema);
