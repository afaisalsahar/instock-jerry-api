// require variables
const express = require('express');
const router  = express.Router();

// Controllers
const warehouseController = require('../controllers/warehouseController')

router
    .route('/')
        .get(warehouseController.getAll)
        .post(warehouseController.addNew); // CREATE new warehouse
        
router
    .route('/:id')
        .delete(warehouseController.deleteWarehouse);

router
    .route('/:id/inventories')
        .get(warehouseController.warehouseInventories); // GET list of inventories for a specific warehouse

module.exports = router;