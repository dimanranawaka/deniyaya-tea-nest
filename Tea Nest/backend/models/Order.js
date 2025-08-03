const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerName: { type: String, required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;