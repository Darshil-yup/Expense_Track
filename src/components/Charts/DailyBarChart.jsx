import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyBarChart = ({ expenses }) => {
  const data = expenses.reduce((acc, { date, amount }) => {
    if (!acc[date]) acc[date] = 0;
    acc[date] += amount;
    return acc;
  }, {});

  const chartData = Object.entries(data)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => b.amount - a.amount) // Sort to find top spending days
    .slice(0, 5); // Show top 5

  if (chartData.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Top 5 Spending Days</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyBarChart;