import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Row, Col, Card, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { BoxSeam, ListUl, ExclamationTriangleFill } from 'react-bootstrap-icons';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register the components needed for Chart.js to work
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, orders: 0 });
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch all required data in parallel for efficiency
                const [productsRes, ordersRes, salesRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/orders'),
                    api.get('/orders/sales-summary') // Fetch new sales data
                ]);

                setStats({ products: productsRes.data.length, orders: ordersRes.data.length });
                setLowStockProducts(productsRes.data.filter(p => p.quantity < 5));
                setSalesData(salesRes.data);
                setError('');
            } catch (err) {
                setError('Could not fetch dashboard data. Please ensure the backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Prepare data for the Sales Line Chart
    const lineChartData = {
        labels: salesData ? Object.keys(salesData.salesOverTime).sort() : [],
        datasets: [
            {
                label: 'Daily Revenue ($)',
                data: salesData ? Object.keys(salesData.salesOverTime).sort().map(date => salesData.salesOverTime[date]) : [],
                fill: true,
                backgroundColor: 'rgba(74, 124, 89, 0.2)',
                borderColor: '#4a7c59', // Primary Green
                tension: 0.1,
            },
        ],
    };

    // Prepare data for the Category Doughnut Chart
    const doughnutChartData = {
        labels: salesData ? Object.keys(salesData.salesByCategory) : [],
        datasets: [
            {
                label: 'Sales by Category ($)',
                data: salesData ? Object.values(salesData.salesByCategory) : [],
                backgroundColor: ['#4a7c59', '#f4a261', '#e76f51', '#2a9d8f', '#264653', '#e9c46a'],
                hoverOffset: 4,
            },
        ],
    };

    if (loading) {
        return <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <h2 className="mb-4">Dashboard</h2>

            {/* Top Stat Cards */}
            <Row>
                <Col md={6} lg={4} className="mb-4">
                    <Card>
                        <Card.Body className="d-flex align-items-center">
                            <BoxSeam size={40} className="me-3 text-success" />
                            <div>
                                <Card.Title>Total Products</Card.Title>
                                <Card.Text className="h3">{stats.products}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4} className="mb-4">
                    <Card>
                        <Card.Body className="d-flex align-items-center">
                            <ListUl size={40} className="me-3 text-info" />
                            <div>
                                <Card.Title>Total Orders</Card.Title>
                                <Card.Text className="h3">{stats.orders}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Sales Charts */}
            <Row>
                <Col lg={8} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Sales Revenue Over Time</Card.Title>
                            {salesData && Object.keys(salesData.salesOverTime).length > 0 ? (
                                <Line data={lineChartData} />
                            ) : (
                                <div className="text-center p-5 text-muted">No sales data available to display.</div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Sales by Category</Card.Title>
                            {salesData && Object.keys(salesData.salesByCategory).length > 0 ? (
                                <Doughnut data={doughnutChartData} />
                            ) : (
                                <div className="text-center p-5 text-muted">No sales data available.</div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Low Stock Alert */}
            <Row>
                <Col>
                    <h3 className="mt-4">Low Stock Alerts</h3>
                    {lowStockProducts.length > 0 ? (
                        <ListGroup>
                            {lowStockProducts.map(product => (
                                <ListGroup.Item key={product._id} variant="warning" className="d-flex justify-content-between align-items-center">
                                    <span><ExclamationTriangleFill className="me-2" /> {product.name} is running low!</span>
                                    <span className="fw-bold">Only {product.quantity} left</span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <Alert variant="success">All products are well-stocked!</Alert>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;