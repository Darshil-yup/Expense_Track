import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DayToDayExpenses = ({ expenses }) => {
  // 1. Data ko date-wise group karke total nikalna
  const dateData = expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += expense.amount;
    return acc;
  }, {});

  // 2. Data ko Recharts ke format mein convert karna
  const chartData = Object.keys(dateData)
    .map(date => ({
      date: date,
      amount: dateData[date],
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Date ke hisaab se sort karna

  if (chartData.length === 0) {
      return null; // Agar koi data nahi hai to kuch mat dikhao
  }

  return (
    <div className="card" style={{ height: '400px' }}>
      <h3>Day-wise Spending</h3>
      <ResponsiveContainer width="100%" height="100%">
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

export default DayToDayExpenses;