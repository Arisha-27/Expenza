import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AddIncome from './components/AddIncome';
import AddExpense from './components/AddExpense';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import Settings from './components/Settings';
import ContactUs from './components/ContactUs';
import Graph from './components/Graph';
import MyChartComponent from './components/MyChartComponent';
import { ProfileProvider } from './context/ProfileContext';  // Import ProfileProvider

function App() {
  const [selectedSection, setSelectedSection] = useState('Home');
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const [budget, setBudget] = useState(10000); // Budget state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Notification state
  const [showNotification, setShowNotification] = useState(false); // State to show/hide notification

  const addIncome = (amount) => {
    setIncome((prevIncome) => prevIncome + amount);
    const newTransaction = { id: Date.now(), type: 'income', amount };
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    
    // Check if the balance exceeds budget and remove notification if true
    if (income + amount - expense >= budget) {
      setShowNotification(false);  // Hide notification if balance is above budget
    }
  };

  const addExpense = (amount, category) => {
    setExpense((prevExpense) => prevExpense + amount);
    const newTransaction = { id: Date.now(), type: 'expense', amount, category };
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

    // Check if the balance is below budget and show notification if enabled
    if (notificationsEnabled && income - (expense + amount) < budget) {
      setShowNotification(true);  // Show notification if balance is below budget
    }
  };

  const resetData = () => {
    setIncome(0);
    setExpense(0);
    setTransactions([]);
    alert('All data has been reset.');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    document.body.className = isDarkTheme ? 'light-theme' : 'dark-theme';
  };

  const balance = income - expense;

  // Watch for changes in the balance and budget
  useEffect(() => {
    if (income - expense < budget) {
      setShowNotification(true); // Show notification when balance is below budget
    } else {
      setShowNotification(false); // Hide notification when balance is above or equal to budget
    }
  }, [income, expense, budget]);

  const renderContent = () => {
    switch (selectedSection) {
      case 'Home':
        return <Dashboard income={income} expense={expense} balance={balance} addIncome={addIncome} addExpense={addExpense} showNotification={showNotification} />;
      case 'Add Income':
        return <AddIncome addIncome={addIncome} />;
      case 'Add Expense':
        return <AddExpense addExpense={addExpense} />;
      case 'History':
        return <ExpenseList transactions={transactions} />;
      case 'Graphs':
        return (
          <>
            <Graph transactions={transactions} />
            <MyChartComponent />
          </>
        );
      case 'Settings':
        return <Settings resetData={resetData} toggleTheme={toggleTheme} setBudget={setBudget} setNotificationsEnabled={setNotificationsEnabled} />;
      case 'Contact Us':
        return <ContactUs />;
      default:
        return <Dashboard income={income} expense={expense} balance={balance} addIncome={addIncome} addExpense={addExpense} showNotification={showNotification} />;
    }
  };

  return (
    <ProfileProvider>
      <div className={`App ${isDarkTheme ? 'dark' : 'light'}`}>
        <Sidebar onSelect={(section) => setSelectedSection(section)} />
        <div className="main-content">
          {renderContent()}
          {showNotification && <div className="notification">You are going below your budget!</div>}
        </div>
      </div>
    </ProfileProvider>
  );
}

export default App;
