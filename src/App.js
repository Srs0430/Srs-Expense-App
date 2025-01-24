import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExpensePage from './components/ExpensePage';
import LoginPage from './components/LoginPage';
import ExpenseReport from './components/ExpenseReport';
import SettingPage from './components/SettingPage';
import EditPage from './components/EditPage';
//import { useContext } from 'react';
//import Context from './components/Context';

function App() {

  //const expenseData = useContext(Context);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpensePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/report" element={<ExpenseReport />} />
        <Route path="/Setting" element={<SettingPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
