const router = require('express').Router();
let Order = require('../models/Order');

// Get all orders
router.route('/').get((req, res) => {
    Order.find()
        .populate('items.productId', 'name')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Submit a new order
router.route('/').post((req, res) => {
    const { customerName, items } = req.body;
    const newOrder = new Order({ customerName, items });

    newOrder.save()
        .then(() => res.json('Order submitted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;