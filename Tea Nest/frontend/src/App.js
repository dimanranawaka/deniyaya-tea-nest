import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Deniyaya Tea Nest</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link to="/" className="nav-link">Dashboard</Link></li>
              <li className="nav-item"><Link to="/products" className="nav-link">Products</Link></li>
              <li className="nav-item"><Link to="/products/new" className="nav-link">Add Product</Link></li>
              <li className="nav-item"><Link to="/orders" className="nav-link">Orders</Link></li>
              <li className="nav-item"><Link to="/orders/new" className="nav-link">New Order</Link></li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/new" element={<OrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;