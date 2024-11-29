
import { Pie, Line } from 'react-chartjs-2';
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext


function Graph({ transactions }) {
  // Aggregate monthly data
  const categories = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  const dailyData = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const date = new Date(transaction.id).toLocaleDateString(); // Convert timestamp to date
      acc[date] = (acc[date] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Pie chart data for categories
  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
      },
    ],
  };

  // Line chart data for daily expenses
  const lineData = {
    labels: Object.keys(dailyData),
    datasets: [
      {
        label: 'Daily Expenses',
        data: Object.values(dailyData),
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="graph-container">
      <h3>Expense Analysis</h3>
      <div className="pie-chart">
        <h4>Monthly Expense by Category</h4>
        <Pie data={pieData} />
      </div>
      <div className="line-chart">
        <h4>Daily Expense</h4>
        <Line data={lineData} />
      </div>
    </div>
  );
}

export default Graph;