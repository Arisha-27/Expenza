import React from 'react';
import './ExpenseList.css';

function ExpenseList({ transactions }) {
  return (
    <div className="expense-list">
      <h2>Transaction History</h2>
      <ul>
        {transactions.length === 0 ? (
          <p>No transactions recorded.</p>
        ) : (
          transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={transaction.type === 'income' ? 'income' : 'expense'}
            >
              <span>
                {transaction.type === 'expense'
                  ? `${transaction.category} - ₹${transaction.amount}`
                  : `Income - ₹${transaction.amount}`}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ExpenseList;
