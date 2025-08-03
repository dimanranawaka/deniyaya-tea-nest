import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; // <-- Use the new centralized api instance
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({ name: '', type: '', price: '', quantity: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get(`/products/${id}`) // <-- Use api instance
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch product data. Ensure you are logged in or the product exists.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/products/${id}`, product) // <-- Use api instance
            .then(res => {
                setMessage('Product updated successfully! Redirecting...');
                setTimeout(() => navigate('/app/products'), 1500);
            })
            .catch(err => {
                setError(err.response?.data?.msg || 'Failed to update product.');
            });
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Card>
            <Card.Body>
                <Card.Title>Edit Product</Card.Title>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tea Type</Form.Label>
                        <Form.Control type="text" name="type" value={product.type} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" step="0.01" name="price" value={product.price} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Update Product</Button>
                    <Button variant="secondary" className="ms-2" onClick={() => navigate('/app/products')}>Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EditProduct;