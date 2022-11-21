// require variables
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// require routes
const warehouseRoutes = require('./routes/warehouse');
const inventoryRoutes = require('./routes/inventory');

// use routes
app.use('/warehouses', warehouseRoutes);
app.use('/inventories', inventoryRoutes);

// listen on port
app.listen(PORT, () => {
    console.log('Instock 🚀🚀🚀');
});
