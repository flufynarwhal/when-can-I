exports.addExpense = async (req, res) => {
  const { title, amount, description, date, category } = req.body;

  const expense = ExpenseSchema({
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
    if (amount < 0 || amount === "number") {
      return res.status(400).json({ message: "Negative Amount Entered" });
    }
    expense.save();

    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mesasge: "Internal Server Error" });
  }
};
