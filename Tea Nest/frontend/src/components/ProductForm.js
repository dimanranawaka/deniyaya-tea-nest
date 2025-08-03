import React, { useState } from 'react';
import api from '../api/axiosConfig'; // <-- Use the new centralized api instance
import { Form, Button, Card } from 'react-bootstrap';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const newProduct = { name, type, price: Number(price), quantity: Number(quantity) };
        api.post('/products', newProduct) // <-- Use api instead of axios
            .then(() => {
                alert('Product added successfully!');
                setName(''); setType(''); setPrice(''); setQuantity('');
            });
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Add New Product</Card.Title>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tea Type</Form.Label>
                        <Form.Control type="text" value={type} onChange={e => setType(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Add Product</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductForm;