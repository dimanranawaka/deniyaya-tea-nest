import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // <-- Use the new centralized api instance
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        api.get('/products') // <-- Use api instead of axios
            .then(response => {
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products!", error);
                setLoading(false);
            });
    };

    const deleteProduct = (id) => {
        api.delete(`/products/${id}`) // <-- Use api instead of axios
            .then(() => fetchProducts()) // Refresh list
            .catch(error => console.error("Error deleting product!", error));
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <h2 className="mb-4">Products</h2>
            {products.length === 0 ? (
                <Alert variant="info">No products found. Please add a product.</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.type}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Link to={`/app/products/edit/${product._id}`}>
                                        <Button variant="info" className="me-2">
                                            <PencilSquare />
                                        </Button>
                                    </Link>
                                    <Button variant="danger" onClick={() => deleteProduct(product._id)}>
                                        <Trash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProductList;