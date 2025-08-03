import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store token in local storage
            setToken(token); // Update app state
            navigate('/app'); // Redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred during login.');
        }
    };

    return (
        <Card className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
            <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Login</Button>
                </Form>
                <div className="mt-3 text-center">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="mt-3 text-center">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Login;