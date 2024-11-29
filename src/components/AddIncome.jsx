import React, { useState } from 'react';

function AddIncome({ addIncome }) {
  const [amount, setAmount] = useState('');

  const handleAddIncome = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (parsedAmount > 0) {
      addIncome(parsedAmount);  // Call addIncome correctly
      setAmount('');  // Reset the input after adding
    } else {
      alert('Please enter a valid income amount');
    }
  };

  return (
    <div className="add-income">
      <h2>Add Income</h2>
      <form onSubmit={handleAddIncome}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
}

export default AddIncome;