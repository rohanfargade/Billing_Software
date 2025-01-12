import './App.css';
import Navbar from '../src/components/Navbar';
import Dashboard from './components/Dashboard';
import CustomerManagement from './components/CustomerManagement';
import { Routes, Route } from 'react-router-dom';
import InventoryManagement from './components/InventoryManagement';
import BillingSystem from './components/BillingSystem';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<CustomerManagement />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/billing" element={<BillingSystem />} />
      </Routes>
    </div>
  );
}

export default App;
