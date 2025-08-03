const router = require('express').Router();
let Product = require('../models/Product');

// Get all products
router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new product
router.route('/').post((req, res) => {
    const { name, type, price, quantity } = req.body;
    const newProduct = new Product({ name, type, price, quantity });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a product
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;