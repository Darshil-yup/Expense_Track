import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendLineChart = ({ expenses }) => {
  const data = expenses.reduce((acc, { date, amount }) => {
    if (!acc[date]) acc[date] = 0;
    acc[date] += amount;
    return acc;
  }, {});

  const chartData = Object.entries(data)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (chartData.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;