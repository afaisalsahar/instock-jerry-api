// require variables
const express = require("express");
const router = express.Router();

// Controllers
const warehouseController = require("../controllers/warehouseController");

router
  .route("/")
  .get(warehouseController.getAll)
  .post(warehouseController.addNew); // CREATE new warehouse

router
  .route("/:id")
  .get(warehouseController.getSingleWarehouse)
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/:id/inventories").get(warehouseController.warehouseInventories); // GET list of inventories for a specific warehouse

module.exports = router;
