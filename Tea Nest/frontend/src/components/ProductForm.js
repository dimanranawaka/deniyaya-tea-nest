import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const newProduct = { name, type, price: Number(price), quantity: Number(quantity) };

        axios.post('http://localhost:5000/products', newProduct)
            .then(res => console.log(res.data));

        setName('');
        setType('');
        setPrice('');
        setQuantity('');
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" required className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Type: </label>
                    <input type="text" required className="form-control" value={type} onChange={e => setType(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Price: </label>
                    <input type="number" required className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Quantity: </label>
                    <input type="number" required className="form-control" value={quantity} onChange={e => setQuantity(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Product" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default ProductForm;