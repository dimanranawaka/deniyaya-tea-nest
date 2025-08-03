import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { HouseDoorFill, BoxSeam, PlusCircleFill, ListUl, CartPlusFill, BoxArrowRight } from 'react-bootstrap-icons';

// Import all components
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import EditProduct from './components/EditProduct';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Landing from './components/Landing';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// A wrapper for protected routes that redirects to login if not authenticated
const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/login" />;
};

// The main application layout (sidebar + content) for authenticated users
const AppLayout = ({ handleLogout }) => (
  <Container fluid>
    <Row>
      <Col md={2} className="sidebar">
        <h3 className="text-white text-center my-3">Tea Nest</h3>
        <Nav className="flex-column">
          <Nav.Link as={NavLink} to="/app" end><HouseDoorFill /> Dashboard</Nav.Link>
          <Nav.Link as={NavLink} to="/app/products"><BoxSeam /> Products</Nav.Link>
          <Nav.Link as={NavLink} to="/app/products/new"><PlusCircleFill /> Add Product</Nav.Link>
          <Nav.Link as={NavLink} to="/app/orders"><ListUl /> Orders</Nav.Link>
          <Nav.Link as={NavLink} to="/app/orders/new"><CartPlusFill /> New Order</Nav.Link>
          <Button variant="danger" onClick={handleLogout} className="mt-4 mx-3">
            <BoxArrowRight /> Logout
          </Button>
        </Nav>
      </Col>
      <Col md={10} className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/new" element={<OrderForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Col>
    </Row>
  </Container>
);

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Application Routes */}
        <Route
          path="/app/*"
          element={
            <PrivateRoute token={token}>
              <AppLayout handleLogout={handleLogout} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;