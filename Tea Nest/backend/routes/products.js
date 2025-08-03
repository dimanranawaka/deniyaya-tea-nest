const router = require('express').Router();
let Product = require('../models/Product');

// [GET] /products -> List all products
router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

// [GET] /products/:id -> Get a single product by ID
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) return res.status(404).json({ msg: 'Product not found' });
            res.json(product);
        })
        .catch(err => res.status(400).json({ msg: 'Error: ' + err }));
});

// [POST] /products -> Add a product
router.route('/').post((req, res) => {
    const { name, type, price, quantity } = req.body;
    const newProduct = new Product({ name, type, price, quantity });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// [PUT] /products/:id -> Update a product by ID
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(product => {
            if (!product) return res.status(404).json({ msg: 'Product not found' });
            res.json({ msg: 'Product updated successfully', product });
        })
        .catch(err => res.status(400).json({ msg: 'Error: ' + err }));
});

// [DELETE] /products/:id -> Delete a product
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;