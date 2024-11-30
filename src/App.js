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
import { ProfileProvider } from './context/ProfileContext';

function App() {
  const [selectedSection, setSelectedSection] = useState('Home');
  const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || []);
  const [income, setIncome] = useState(parseFloat(localStorage.getItem('income')) || 0);
  const [expense, setExpense] = useState(parseFloat(localStorage.getItem('expense')) || 0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [budget, setBudget] = useState(10000);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const addIncome = (amount) => {
    setIncome((prevIncome) => {
      const newIncome = prevIncome + amount;
      const newTransaction = { id: Date.now(), type: 'income', amount };
      setTransactions((prevTransactions) => {
        const updatedTransactions = [newTransaction, ...prevTransactions];
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        localStorage.setItem('income', newIncome);
        return updatedTransactions;
      });
      return newIncome;
    });
  };

  const addExpense = (amount, category) => {
    setExpense((prevExpense) => {
      const newExpense = prevExpense + amount;
      const newTransaction = { id: Date.now(), type: 'expense', amount, category };
      setTransactions((prevTransactions) => {
        const updatedTransactions = [newTransaction, ...prevTransactions];
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        localStorage.setItem('expense', newExpense);
        return updatedTransactions;
      });

      if (notificationsEnabled && (income - (newExpense + amount)) < budget) {
        setShowNotification(true);
      }
      return newExpense;
    });
  };

  const resetData = () => {
    setIncome(0);
    setExpense(0);
    setTransactions([]);
    localStorage.removeItem('transactions');
    localStorage.setItem('income', 0);
    localStorage.setItem('expense', 0);
    alert('All data has been reset.');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    document.body.className = isDarkTheme ? 'light-theme' : 'dark-theme';
  };

  const balance = income - expense;

  useEffect(() => {
    if (balance < budget) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
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
        <Sidebar onSelect={(section) => setSelectedSection(section)} selectedSection={selectedSection} />
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </ProfileProvider>
  );
}

export default App;
