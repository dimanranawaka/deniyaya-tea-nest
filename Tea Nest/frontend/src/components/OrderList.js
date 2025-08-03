import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2>Order List</h2>
            {orders.map(order => (
                <div key={order._id} className="card mb-3">
                    <div className="card-header">
                        Order ID: {order._id}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Customer: {order.customerName}</h5>
                        <p className="card-text">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                        <h6>Items:</h6>
                        <ul className="list-group list-group-flush">
                            {order.items.map(item => (
                                <li key={item.productId._id} className="list-group-item">
                                    {item.productId.name} - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;