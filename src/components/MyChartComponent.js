import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const MyChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const canvasElement = document.getElementById('myChart');
    const ctx = canvasElement.getContext('2d');

    // Destroy any existing chart before creating a new one to prevent canvas errors
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart and store the instance in the ref
    chartRef.current = new ChartJS(ctx, {
      type: 'line',  // Line chart (you can change this to 'bar' or other chart types)
      data: {
        labels: ['January', 'February', 'March'],
        datasets: [{
          label: 'Expenses',
          data: [50, 75, 100],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Expenses',
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);  // Empty dependency array means this effect runs only once after initial render

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default MyChartComponent;