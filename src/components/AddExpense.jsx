import React, { useState } from 'react';
import './AddExpense.css';

const AddExpense = ({ addExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = () => {
    if (amount > 0 && category) {
      addExpense(parseFloat(amount), category);
      setAmount('');
      setCategory('');
    } else {
      alert('Please enter a valid amount and category');
    }
  };

  return (
    <div className="form-card">
      <h4>Add Expense</h4>
      <input
        type="number"
        value={amount}
        placeholder="Enter expense amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        value={category}
        placeholder="Enter expense category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default AddExpense;
