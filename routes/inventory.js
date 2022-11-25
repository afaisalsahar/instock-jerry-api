// require variables
const express = require("express");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router
    .route('/')
    .get(inventoryController.getAll) // Get list of all inventory items
    .post(inventoryController.addInventoryItem) // Add a new inventory item


router
  .route("/:id")
  .get(inventoryController.getSingleInventoryDetail)
  .put(inventoryController.updateInventory) // Edit an inventory item
  .delete(inventoryController.deleteItem); // Delete inventory item, given ID. 

module.exports = router;
