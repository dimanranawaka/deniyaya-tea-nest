import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // <-- Use the new centralized api instance
import { Row, Col, Card, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { BoxSeam, ListUl, ExclamationTriangleFill } from 'react-bootstrap-icons';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Use Promise.all to fetch data concurrently with the new 'api' instance
                const [productsRes, ordersRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/orders')
                ]);

                if (Array.isArray(productsRes.data)) setProducts(productsRes.data);
                if (Array.isArray(ordersRes.data)) setOrders(ordersRes.data);
                setError('');
            } catch (err) {
                setError('Could not fetch dashboard data. Please ensure the backend is running and you are logged in.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    const lowStockProducts = products.filter(p => p.quantity < 5);

    return (
        <div>
            <h2 className="mb-4">Dashboard</h2>
            <Row>
                <Col md={6}>
                    <Card className="mb-3">
                        <Card.Body className="d-flex align-items-center">
                            <BoxSeam size={40} className="me-3" />
                            <div>
                                <Card.Title>Total Products</Card.Title>
                                <Card.Text className="h3">{products.length}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body className="d-flex align-items-center">
                            <ListUl size={40} className="me-3" />
                            <div>
                                <Card.Title>Total Orders</Card.Title>
                                <Card.Text className="h3">{orders.length}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h3 className="mt-5">Low Stock Alerts</h3>
            {lowStockProducts.length > 0 ? (
                <Alert variant="warning">
                    <ListGroup variant="flush">
                        {lowStockProducts.map(product => (
                            <ListGroup.Item key={product._id} className="d-flex justify-content-between align-items-center bg-transparent border-0">
                                <span><ExclamationTriangleFill className="me-2" /> {product.name}</span>
                                <span className="fw-bold">Quantity: {product.quantity}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Alert>
            ) : (
                <Alert variant="success">All products are well-stocked!</Alert>
            )}
        </div>
    );
};

export default Dashboard;