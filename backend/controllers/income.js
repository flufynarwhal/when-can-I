const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validation
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    await income.save();

    if (!amount < 0) {
      return res.status(201).json({
        message: "Income Added.",
        warning: "Negative amount entered.",
      });
    } else {
      return res.status(201).json({ message: "Income Added" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 5;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const incomes = await IncomeSchema.find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const totalIncomes = await IncomeSchema.countDocuments();
    const totalPages = Math.ceil(totalIncomes / pageSize);

    res.status(200).json({
      incomes,
      currentPage: pageNumber,
      totalPages,
      totalIncomes,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const income = await IncomeSchema.findByIdAndDelete(id);

    if (!income) {
      return res.status(404).json({ message: "Income Not Found" });
    }

    res.status(200).json({ message: "Income Entry Deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting income" });
  }
};
