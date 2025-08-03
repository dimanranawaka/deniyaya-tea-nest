import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));

        axios.get('http://localhost:5000/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.log(error));
    }, []);

    const lowStockProducts = products.filter(p => p.quantity < 5);

    return (
        <div>
            <h2>Dashboard</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Products</h5>
                            <p className="card-text">{products.length}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Orders</h5>
                            <p className="card-text">{orders.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mt-4">Low Stock Alerts (quantity &lt; 5)</h3>
            <ul className="list-group">
                {lowStockProducts.map(product => (
                    <li key={product._id} className="list-group-item">
                        {product.name} - Quantity: {product.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;