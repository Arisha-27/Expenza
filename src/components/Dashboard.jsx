import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import AddIncome from './AddIncome';
import AddExpense from './AddExpense';
import './Dashboard.css';

const Dashboard = () => {
  // Initialize state from localStorage if available
  const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

  const [transactions, setTransactions] = useState(storedTransactions);
  const [income, setIncome] = useState(storedTransactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc, 0));
  const [expense, setExpense] = useState(storedTransactions.reduce((acc, curr) => curr.type === 'expense' ? acc + curr.amount : acc, 0));
  const [balance, setBalance] = useState(income - expense);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add income
  const addIncome = (amount) => {
    const newTransaction = {
      id: new Date().getTime(),
      type: 'income',
      amount: amount,
    };
    setTransactions((prevTransactions) => {
      const updatedTransactions = [...prevTransactions, newTransaction];
      updateSummary(updatedTransactions);
      return updatedTransactions;
    });
  };

  // Add expense
  const addExpense = (amount, category) => {
    const newTransaction = {
      id: new Date().getTime(),
      type: 'expense',
      amount: amount,
      category: category,
    };
    setTransactions((prevTransactions) => {
      const updatedTransactions = [...prevTransactions, newTransaction];
      updateSummary(updatedTransactions);
      return updatedTransactions;
    });
  };

  // Update income, expense, and balance based on transactions
  const updateSummary = (updatedTransactions) => {
    const newIncome = updatedTransactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc, 0);
    const newExpense = updatedTransactions.reduce((acc, curr) => curr.type === 'expense' ? acc + curr.amount : acc, 0);
    const newBalance = newIncome - newExpense;
    setIncome(newIncome);
    setExpense(newExpense);
    setBalance(newBalance);
  };

  return (
    <div className="dashboard">
      <div className="summary">
        <div className="card income">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>
        <div className="card expense">
          <h3>Expense</h3>
          <p>₹{expense}</p>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>
      <div className="form-section">
        <AddIncome addIncome={addIncome} />
        <AddExpense addExpense={addExpense} />
      </div>

    </div>
  );
};

export default Dashboard;
