// Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css'; // Assuming you have a separate CSS for Dashboard

const Dashboard = ({ income, expense, balance, addIncome, addExpense, showNotification }) => {
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  // Handle adding income
  const handleAddIncome = (e) => {
    e.preventDefault();
    if (incomeAmount > 0) {
      addIncome(Number(incomeAmount));  // Pass income to addIncome function
      setIncomeAmount('');
    } else {
      alert('Please enter a valid income amount');
    }
  };

  // Handle adding expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (expenseAmount > 0 && expenseCategory.trim() !== '') {
      addExpense(Number(expenseAmount), expenseCategory);  // Pass expense details to addExpense function
      setExpenseAmount('');
      setExpenseCategory('');
    } else {
      alert('Please enter valid expense details');
    }
  };

  return (
    <div className="dashboard">
      <div className="summary">
        <div className="card">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>
        <div className="card">
          <h3>Expense</h3>
          <p>₹{expense}</p>
        </div>
        <div className="card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      <div className="actions">
        {/* Add Income Form */}
        <div className="form-container">
          <h4>Add Income</h4>
          <form onSubmit={handleAddIncome}>
            <input
              type="number"
              placeholder="Enter income amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
            />
            <button type="submit">Add Income</button>
          </form>
        </div>

        {/* Add Expense Form */}
        <div className="form-container">
          <h4>Add Expense</h4>
          <form onSubmit={handleAddExpense}>
            <input
              type="number"
              placeholder="Enter expense amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter expense category"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
            />
            <button type="submit">Add Expense</button>
          </form>
        </div>
      </div>
      {showNotification && <div className="notification">You are going below your budget!</div>}
    </div>
  );
}

export default Dashboard;  // Ensure it's default export
