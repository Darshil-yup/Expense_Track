import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AmountHistogram = ({ expenses }) => {
  const bins = { '0-100': 0, '101-500': 0, '501-1000': 0, '1001-5000': 0, '5000+': 0 };

  expenses.forEach(({ amount }) => {
    if (amount <= 100) bins['0-100']++;
    else if (amount <= 500) bins['101-500']++;
    else if (amount <= 1000) bins['501-1000']++;
    else if (amount <= 5000) bins['1001-5000']++;
    else bins['5000+']++;
  });

  const chartData = Object.entries(bins).map(([range, count]) => ({ range, count }));
  
  if (expenses.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Expense Amount Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AmountHistogram;