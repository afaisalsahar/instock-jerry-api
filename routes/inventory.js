// require variables
const express = require('express');
const fs = require('fs');
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
    .put((req, res) => {

    })
    .delete((req, res) => {

    })
        
module.exports = router;