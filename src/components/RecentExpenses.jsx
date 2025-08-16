import React from 'react';
import './RecentExpenses.css';

const RecentExpenses = ({ expenses, deleteExpense }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="card">
        <h2>Recent Expenses</h2>
        <p>No expenses to show.</p>
      </div>
    );
  }

  // 1. Find the entire expense object for the highest and lowest expense
  const highestExpense = expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current);
  const lowestExpense = expenses.reduce((prev, current) => (prev.amount < current.amount) ? prev : current);

  return (
    <div className="card">
      <h2>Recent Expenses</h2>
      
      {/* 2. Display the updated summary section */}
      <div className="expense-summary">
        <div className="summary-item">
          <span>Highest Expense</span>
          <p className="summary-description">{highestExpense.description}</p>
          <p className="summary-amount">₹{highestExpense.amount.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <span>Lowest Expense</span>
          <p className="summary-description">{lowestExpense.description}</p>
          <p className="summary-amount">₹{lowestExpense.amount.toFixed(2)}</p>
        </div>
      </div>

      <table className="expenses-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>₹{expense.amount.toFixed(2)}</td>
              <td><button onClick={() => deleteExpense(expense.id)} className="delete-btn">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentExpenses;