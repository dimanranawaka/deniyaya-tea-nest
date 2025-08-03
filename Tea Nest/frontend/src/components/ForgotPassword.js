import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await axios.post('http://localhost:5000/auth/forgot-password', { email });
            setMessage(res.data.msg);
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        }
    };

    return (
        <Card className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
            <Card.Body>
                <Card.Title className="text-center">Forgot Password</Card.Title>
                <p className="text-muted text-center">Enter your email and we'll send you a reset token (check your backend console).</p>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Submit</Button>
                </Form>
                <div className="mt-3 text-center">
                    Remembered your password? <Link to="/login">Login</Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ForgotPassword;