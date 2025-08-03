const router = require('express').Router();
let Order = require('../models/Order');

// [GET] /orders -> List all orders (with populated product names)
router.route('/').get((req, res) => {
    Order.find()
        .populate('items.productId', 'name')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

// [POST] /orders -> Submit a new order
router.route('/').post((req, res) => {
    const { customerName, items } = req.body;
    const newOrder = new Order({ customerName, items });

    newOrder.save()
        .then(() => res.json('Order submitted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// [GET] /orders/sales-summary -> Get aggregated sales data for dashboard charts
router.get('/sales-summary', async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'items.productId',
            select: 'price type' // Only select the fields we need
        });

        // 1. Calculate Sales Over Time (by date)
        const salesOverTime = {};
        orders.forEach(order => {
            const date = order.createdAt.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            if (!salesOverTime[date]) {
                salesOverTime[date] = 0;
            }
            order.items.forEach(item => {
                // Ensure product exists and has a price before calculating
                if (item.productId && typeof item.productId.price === 'number') {
                    salesOverTime[date] += item.quantity * item.productId.price;
                }
            });
        });

        // 2. Calculate Sales by Category (Tea Type)
        const salesByCategory = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                if (item.productId && item.productId.type && typeof item.productId.price === 'number') {
                    const category = item.productId.type;
                    if (!salesByCategory[category]) {
                        salesByCategory[category] = 0;
                    }
                    salesByCategory[category] += item.quantity * item.productId.price;
                }
            });
        });

        res.json({ salesOverTime, salesByCategory });

    } catch (err) {
        console.error('Error fetching sales summary:', err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;