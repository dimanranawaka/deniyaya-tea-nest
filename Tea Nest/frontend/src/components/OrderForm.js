import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([{ productId: '', quantity: 1 }]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleItemChange = (index, event) => {
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
    };

    const handleAddItem = () => {
        setItems([...items, { productId: '', quantity: 1 }]);
    };

    const handleRemoveItem = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newOrder = { customerName, items };

        axios.post('http://localhost:5000/orders', newOrder)
            .then(res => console.log(res.data));

        setCustomerName('');
        setItems([{ productId: '', quantity: 1 }]);
    };

    return (
        <div>
            <h2>Create New Order</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Customer Name:</label>
                    <input type="text" required className="form-control" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                </div>

                {items.map((item, index) => (
                    <div key={index} className="form-row align-items-center mb-2">
                        <div className="col">
                            <select name="productId" value={item.productId} onChange={event => handleItemChange(index, event)} className="form-control">
                                <option value="">Select a Product</option>
                                {products.map(product => (
                                    <option key={product._id} value={product._id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col">
                            <input type="number" name="quantity" value={item.quantity} onChange={event => handleItemChange(index, event)} className="form-control" />
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
                        </div>
                    </div>
                ))}

                <button type="button" className="btn btn-secondary mr-2" onClick={handleAddItem}>Add Item</button>
                <button type="submit" className="btn btn-primary">Submit Order</button>
            </form>
        </div>
    );
};

export default OrderForm;