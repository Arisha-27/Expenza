import React, { useState } from 'react';
import './AddIncome.css';

const AddIncome = ({ addIncome }) => {
  const [amount, setAmount] = useState('');

  const handleAddIncome = () => {
    if (amount > 0) {
      addIncome(parseFloat(amount));
      setAmount('');
    } else {
      alert('Please enter a valid income amount');
    }
  };

  return (
    <div className="form-card">
      <h4>Add Income</h4>
      <input
        type="number"
        value={amount}
        placeholder="Enter income amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAddIncome}>Add Income</button>
    </div>
  );
};

export default AddIncome;
