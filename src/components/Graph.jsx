import { Pie, Line } from 'react-chartjs-2';
import React from 'react';
import './Graph.css';

function Graph({ transactions }) {
  // Log transactions to check if data is received properly
  console.log(transactions);

  if (!transactions || transactions.length === 0) {
    return <div>No transactions available</div>;  // Handle empty data
  }

  // Aggregate monthly data by category
  const categories = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Aggregate daily data
  const dailyData = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const date = new Date(transaction.id).toLocaleDateString(); // Convert timestamp to date
      acc[date] = (acc[date] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Log aggregated data to check if it's correct
  console.log('Categories: ', categories);
  console.log('Daily Data: ', dailyData);

  // Pie chart data for categories
  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
        hoverBackgroundColor: ['#FF7494', '#42B4F4', '#FFE067', '#5FD65F', '#FFAD33'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
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
        backgroundColor: '#42A5F5',
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expense Amount (₹)',
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <h3>Expense Analysis</h3>
      <div className="charts">
        <div className="chart">
          <h4>Monthly Expense by Category</h4>
          <div style={{ height: '300px', width: '100%' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="chart">
          <h4>Daily Expense</h4>
          <div style={{ height: '300px', width: '100%' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
