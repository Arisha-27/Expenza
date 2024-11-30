import React, { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList'; // You already have this component
import './HistoryPage.css';

const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  return (
    <div className="history-page">
      <h2>Transaction History</h2>
      <ExpenseList transactions={transactions} />
    </div>
  );
};

export default HistoryPage;
