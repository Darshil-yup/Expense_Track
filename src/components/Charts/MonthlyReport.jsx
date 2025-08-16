import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Har category ke liye alag-alag color
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const MonthlyReport = ({ expenses }) => {
  // 1. Data ko process karke category-wise total nikalna
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});

  // 2. Data ko Recharts ke format mein convert karna
  const chartData = Object.keys(categoryData).map(category => ({
    name: category,
    value: categoryData[category],
  }));

  if (chartData.length === 0) {
    return <div className="card"><p>Add expenses to see a report.</p></div>;
  }

  return (
    <div className="card" style={{ height: '400px' }}>
      <h3>Category-wise Spending</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={(entry) => entry.name}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyReport;