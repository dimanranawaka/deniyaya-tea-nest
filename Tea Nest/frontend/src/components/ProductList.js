import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    };

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`)
            .then(() => fetchProducts())
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul className="list-group">
                {products.map(product => (
                    <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {product.name} ({product.type}) - ${product.price} - Qty: {product.quantity}
                        <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;