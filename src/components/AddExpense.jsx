import React, { useState } from 'react';

function AddExpense({ addExpense }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (parsedAmount > 0 && category) {
      addExpense(parsedAmount, category);  // Call addExpense function passed as prop
      setAmount('');  // Clear the input fields after adding
      setCategory('');
    } else {
      alert('Please enter a valid expense amount and category');
    }
  };

  return (
    <div className="add-expense">
      <h2>Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;