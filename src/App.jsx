import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx'; // Import the new AuthPage
import ProfilePage from './pages/ProfilePage.jsx';
import InvestmentPage from './pages/InvestmentPage.jsx';

// Import Components
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import RecentExpenses from './components/RecentExpenses.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Main layout with the Navbar
const AppLayout = () => (
  <div>
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
  </div>
);

// Individual page components
const DashboardPage = ({ expenses, deleteExpense }) => (
    <>
        <Dashboard expenses={expenses} />
        <RecentExpenses expenses={expenses} deleteExpense={deleteExpense} />
    </>
);
const AllExpensesPage = ({ expenses, deleteExpense }) => (
    <div className="card">
        <h1>All Expenses</h1>
        <RecentExpenses expenses={expenses} deleteExpense={deleteExpense} />
    </div>
);
const AddExpensePage = ({ addExpense }) => (
    <div className="card">
        <h1>Add a New Expense</h1>
        <ExpenseForm onExpenseAdded={addExpense} />
    </div>
);

function App() {
  // --- STATE MANAGEMENT ---
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  const [currentUser, setCurrentUser] = useState(null);

  // --- USEEFFECT HOOKS FOR EXPENSE STORAGE ---
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  // --- AUTHENTICATION & USER FUNCTIONS ---
  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateUser = (updatedUserData) => {
    setCurrentUser(updatedUserData);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === updatedUserData.email);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUserData };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  // --- EXPENSE FUNCTIONS ---
  const addExpense = (expenseData) => {
    const newExpense = { ...expenseData, id: Date.now() };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      {/* Replace login and signup routes with a single auth route */}
      <Route path="/auth" element={<AuthPage onLogin={handleLogin} onSignup={handleLogin} />} />

      {/* Protected Routes Wrapper */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage expenses={expenses} deleteExpense={deleteExpense} />} />
          <Route path="/expenses" element={<AllExpensesPage expenses={expenses} deleteExpense={deleteExpense} />} />
          <Route path="/add-expense" element={<AddExpensePage addExpense={addExpense} />} />
          <Route path="/investments" element={<InvestmentPage />} />
          <Route 
            path="/profile" 
            element={<ProfilePage user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />} 
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;