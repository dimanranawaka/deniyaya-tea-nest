import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // <-- Use the new centralized api instance
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { PlusCircle, Trash } from 'react-bootstrap-icons';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([{ productId: '', quantity: 1 }]);

    useEffect(() => {
        api.get('/products') // <-- Use api instead of axios
            .then(response => setProducts(response.data));
    }, []);

    const handleItemChange = (index, event) => {
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
    };

    const handleAddItem = () => setItems([...items, { productId: '', quantity: 1 }]);
    const handleRemoveItem = index => setItems(items.filter((_, i) => i !== index));

    const onSubmit = (e) => {
        e.preventDefault();
        api.post('/orders', { customerName, items }) // <-- Use api instead of axios
            .then(() => {
                alert('Order submitted successfully!');
                setCustomerName('');
                setItems([{ productId: '', quantity: 1 }]);
            });
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Create New Order</Card.Title>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
                    </Form.Group>

                    <h5 className="mt-4">Order Items</h5>
                    {items.map((item, index) => (
                        <Row key={index} className="mb-2 align-items-end">
                            <Col md={7}>
                                <Form.Label>Product</Form.Label>
                                <Form.Control as="select" name="productId" value={item.productId} onChange={e => handleItemChange(index, e)} required>
                                    <option value="">Select a Product</option>
                                    {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                </Form.Control>
                            </Col>
                            <Col md={3}>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" name="quantity" value={item.quantity} onChange={e => handleItemChange(index, e)} min="1" required />
                            </Col>
                            <Col md={2}>
                                <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                                    <Trash />
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    <Button variant="secondary" onClick={handleAddItem} className="mt-2 me-2">
                        <PlusCircle className="me-1" /> Add Item
                    </Button>
                    <Button variant="primary" type="submit" className="mt-2">Submit Order</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default OrderForm;