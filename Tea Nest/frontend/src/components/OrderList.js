import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // <-- Use the new centralized api instance
import { Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get('/orders') // <-- Use api instead of axios
            .then(response => {
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching orders!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h2 className="mb-4">Orders</h2>
            {orders.length === 0 ? (
                <Alert variant="info">No orders have been submitted yet.</Alert>
            ) : (
                orders.map(order => (
                    <Card key={order._id} className="mb-3">
                        <Card.Header className="d-flex justify-content-between">
                            <strong>Customer: {order.customerName}</strong>
                            <small className="text-muted">
                                {new Date(order.createdAt).toLocaleString()}
                            </small>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {order.items.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        {item.productId?.name || 'Product not found'} - Quantity: {item.quantity}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export default OrderList;