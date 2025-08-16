import React from 'react';
import './Dashboard.css'; // Import the CSS for our grid layout

// Import all the new chart components
import CategoryPieChart from './Charts/CategoryPieChart.jsx';
import DailyBarChart from './Charts/DailyBarChart.jsx';
import TrendLineChart from './Charts/TrendLineChart.jsx';
import AmountScatterPlot from './Charts/AmountScatterPlot.jsx';
import AmountHistogram from './Charts/AmountHistogram.jsx';

const Dashboard = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="card"><h2>No expenses recorded yet.</h2></div>
      </div>
    );
  }

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card total-expenses-card">
        <h2>Total Expenses</h2>
        <p>₹{totalExpense.toFixed(2)}</p>
      </div>

      <div className="dashboard-grid">
        <CategoryPieChart expenses={expenses} />
        <DailyBarChart expenses={expenses} />
        <TrendLineChart expenses={expenses} />
        <AmountScatterPlot expenses={expenses} />
        <AmountHistogram expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;