import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AmountScatterPlot = ({ expenses }) => {
  const chartData = expenses.map(({ date, amount }) => ({
    day: new Date(date).getDate(), // Get just the day of the month
    amount: amount,
  }));
  
  if (chartData.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Amount vs. Day of Month</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="day" name="Day of Month" />
          <YAxis type="number" dataKey="amount" name="Amount" unit="₹" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Expenses" data={chartData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AmountScatterPlot;