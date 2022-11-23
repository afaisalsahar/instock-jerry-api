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
    .get((req, res) => {

    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    })

router
    .get('/:id/inventories', (req, res) => {
        
    })

module.exports = router;