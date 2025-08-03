const { MongoClient } = require('mongodb');

// Your connection string
const uri = "mongodb+srv://dimanranwaka:g6NrLKXN34kPUfns@deniyaya-tea-nest.vc7k0ge.mongodb.net/?retryWrites=true&w=majority&appName=deniyaya-tea-nest";

// The constructor no longer needs the extra options
const client = new MongoClient(uri);

const products = [
    // ... (same product data as before)
    { name: "Emerald Green", type: "Green Tea", price: 12.50, quantity: 25 },
    { name: "Royal Black", type: "Black Tea", price: 10.00, quantity: 30 },
    { name: "Soothing Chamomile", type: "Herbal Infusion", price: 8.75, quantity: 15 },
    { name: "Spiced Chai", type: "Black Tea", price: 11.25, quantity: 20 },
    { name: "Morning Sunshine", type: "White Tea", price: 15.00, quantity: 4 },
    { name: "Oolong Orchid", type: "Oolong Tea", price: 18.50, quantity: 12 },
    { name: "Peppermint Burst", type: "Herbal Infusion", price: 7.50, quantity: 40 },
    { name: "Earl Grey Classic", type: "Black Tea", price: 10.50, quantity: 22 },
    { name: "Jasmine Pearls", type: "Green Tea", price: 22.00, quantity: 8 },
    { name: "Rooibos Sunset", type: "Herbal Infusion", price: 9.00, quantity: 18 },
];

const orders = [
    // ... (same order data as before)
    {
        customerName: "Alice Johnson",
        items: [{ productName: "Emerald Green", quantity: 2 }, { productName: "Spiced Chai", quantity: 1 }],
        createdAt: new Date("2025-07-28T10:30:00Z"),
    },
    {
        customerName: "Bob Williams",
        items: [{ productName: "Royal Black", quantity: 3 }],
        createdAt: new Date("2025-07-29T14:00:00Z"),
    },
    {
        customerName: "Charlie Brown",
        items: [{ productName: "Soothing Chamomile", quantity: 1 }, { productName: "Peppermint Burst", quantity: 1 }, { productName: "Rooibos Sunset", quantity: 2 }],
        createdAt: new Date("2025-07-30T09:15:00Z"),
    },
    {
        customerName: "Diana Miller",
        items: [{ productName: "Morning Sunshine", quantity: 1 }],
        createdAt: new Date("2025-08-01T11:00:00Z"),
    },
    {
        customerName: "Ethan Davis",
        items: [{ productName: "Oolong Orchid", quantity: 2 }, { productName: "Jasmine Pearls", quantity: 1 }],
        createdAt: new Date("2025-08-02T16:45:00Z"),
    },
];


async function seedDB() {
    try {
        // 1. Connect to the server
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db("deniyaya-tea-nest");
        const productCollection = db.collection("products");
        const orderCollection = db.collection("orders");

        // 2. Clear existing data
        await productCollection.deleteMany({});
        await orderCollection.deleteMany({});
        console.log("Cleared existing data.");

        // 3. Insert new products
        await productCollection.insertMany(products);
        console.log(`${products.length} products were inserted.`);

        // 4. Create a map of product names to their new _id
        const productMap = {};
        const productCursor = await productCollection.find({});
        await productCursor.forEach(doc => {
            productMap[doc.name] = doc._id;
        });

        // 5. Format orders with correct product IDs
        const ordersWithProductIds = orders.map(order => {
            return {
                ...order,
                items: order.items.map(item => ({
                    productId: productMap[item.productName],
                    quantity: item.quantity,
                })),
            };
        });

        // Remove the temporary productName from the final order objects
        ordersWithProductIds.forEach(order => {
            order.items.forEach(item => delete item.productName);
        });

        // 6. Insert new orders
        await orderCollection.insertMany(ordersWithProductIds);
        console.log(`${orders.length} orders were inserted.`);

    } catch (err) {
        console.error(err);
    } finally {
        // 7. Ensure the client will close when you finish/error
        await client.close();
        console.log("Connection closed.");
    }
}

seedDB();