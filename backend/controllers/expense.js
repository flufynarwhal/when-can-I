const Expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, description, date, category } = req.body;

  const expense = new Expense({
    title,
    amount,
    description,
    date,
    category,
  });

  try {
    if (!title || !amount || !description || !date || !category) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    if (amount < 0 || typeof amount !== "number") {
      return res.status(400).json({ message: "Negative Amount Entered" });
    }
    await expense.save();

    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ message: "Error Adding Expense" });
  }
};

exports.getExpense = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const skip = (page - 1) * limit;

  try {
    const expenses = await Expense.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalExpenses = await Expense.countDocuments();

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }

    res.status(200).json({
      totalExpenses,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalExpenses / limit),
      expenses,
    });
  } catch (error) {
    console.error("error fetching expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.Type.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(400).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Error deleting expense" });
  }
};
