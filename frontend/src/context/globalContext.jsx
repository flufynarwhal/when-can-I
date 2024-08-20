import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      setIncomes([...incomes, response.data]);
      getIncomes();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      console.log(response.data);
      setIncomes(response.data.incomes || []);
    } catch (err) {
      console.error("Error fetching incomes:", err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const deleteIncome = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (error) {
      console.error("Error Deleting Income:", error);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };
  console.log(totalIncome);
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        incomes,
        getIncomes,
        expenses,
        error,
        deleteIncome,
        totalIncome,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
