// require variables
const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router  = express.Router();

router
    .route('/')
    .get(inventoryController.getAll)
    .post((req, res) => {

    })

router
    .route('/:id')
    .get((req, res) => {

    })
    .put(inventoryController.updateInventory)
    

    .delete((req, res) => {
    })
    .delete(inventoryController.deleteItem); // Delete inventory item, given ID. 

module.exports = router;