import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { Speedometer2, BoxSeam, ClipboardData, ChatQuote } from 'react-bootstrap-icons';
import './Landing.css'; // We will create this CSS file next

const Landing = () => {
    return (
        <div className="landing-page">
            {/* Navigation Bar */}
            <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="text-success font-weight-bold">
                        Deniyaya Tea Nest
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Button as={Link} to="/login" variant="outline-success">Login</Button>
                        <Button as={Link} to="/register" variant="success" className="ms-2">Get Started</Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <header className="hero-section text-center text-white">
                <Container>
                    <h1 className="display-4">Streamline Your Tea Business</h1>
                    <p className="lead">
                        Manage products, track orders, and gain insights with one simple tool.
                    </p>
                    <Button as={Link} to="/register" variant="light" size="lg">Start Your Free Trial</Button>
                </Container>
            </header>

            {/* Features Section */}
            <section id="features" className="py-5">
                <Container>
                    <h2 className="text-center mb-5">Everything You Need to Succeed</h2>
                    <Row>
                        <Col md={4} className="text-center mb-4">
                            <div className="feature-icon bg-success text-white mb-3">
                                <BoxSeam size={40} />
                            </div>
                            <h4>Inventory Management</h4>
                            <p className="text-muted">Easily add, update, and track your tea products with low-stock alerts.</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="feature-icon bg-success text-white mb-3">
                                <ClipboardData size={40} />
                            </div>
                            <h4>Order Tracking</h4>
                            <p className="text-muted">A clear and simple interface to view and manage all customer orders.</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="feature-icon bg-success text-white mb-3">
                                <Speedometer2 size={40} />
                            </div>
                            <h4>Analytics Dashboard</h4>
                            <p className="text-muted">Get a quick overview of your business health with key performance indicators.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonial Section */}
            <section className="bg-light py-5">
                <Container>
                    <h2 className="text-center mb-5">Loved by Tea Shop Owners</h2>
                    <Row>
                        <Col md={6} className="mx-auto">
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="text-center">
                                    <ChatQuote size={30} className="text-success mb-3" />
                                    <blockquote className="blockquote">
                                        <p className="mb-2">"This tool has transformed how we manage our inventory. The low-stock alerts alone have saved us countless hours."</p>
                                        <footer className="blockquote-footer">Jane Doe, <cite title="Source Title">The Tea Spot</cite></footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="py-4 text-center">
                <Container>
                    <p className="mb-0">© {new Date().getFullYear()} Deniyaya Tea Nest. All Rights Reserved.</p>
                </Container>
            </footer>
        </div>
    );
};

export default Landing;