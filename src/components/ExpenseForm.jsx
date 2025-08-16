import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  // 1. Add new state for the date, with today's date as the default
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0 || !date) {
      alert("Please fill all fields correctly. Amount must be greater than 0.");
      return;
    }
    
    // 3. Pass the date along with other form data
    onExpenseAdded({
      description,
      category,
      amount: parseFloat(amount),
      date, // Add the date here
    });
    
    // Clear form and show success message
    setDescription('');
    setAmount('');
    alert('Expense Added Successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form-page">
      <input 
        type="text" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Expense Description"
      />
      <input 
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount"
      />
      {/* 2. Add the date input field to the form */}
      <input 
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Groceries">Groceries</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;