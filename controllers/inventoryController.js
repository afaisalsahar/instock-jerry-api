const { param } = require('../routes/warehouse');

const knex = require('knex')(require('../knexfile'));

// get list of all inventory items
exports.getAll = (req, res) => {
    knex('inventories')
        .join('warehouses', 'warehouses.id', 'inventories.warehouse_id')
        .select('inventories.id', 'warehouses.warehouse_name', 'inventories.item_name', 'inventories.description', 'inventories.category', 'inventories.status', 'inventories.quantity')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error retrieving inventories ${err}`))
}

// edit a single inventory item
exports.updateInventory = (req, res) => {
  // Validate the request body for required data
    if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.warehouse_id || !req.body.quantity) {
        return res.status(400).send('Please make sure to provide item name, item description, item category, item status and warehouse name to continue');
    }
    //look for inventory item ID and if it doesn't exist, return at error
    knex('inventories')
        .where({id: req.params.id})
        .then((response) => {
            if (response.length !==0) {
                const editedInventory = {
                    id: req.body.id,
                    item_name: req.body.item_name,
                    description: req.body.description,
                    category: req.body.category,
                    status: req.body.status,
                    warehouse_id: req.body.warehouse_id,
                    quantity: req.body.quantity
                }
                // make call to get updated item
                knex('inventories')
                .where({id: req.params.id})
                .update(editedInventory)
                .then(() => {
                    //response returns status 200 when successful
                    res.status(200).json(editedInventory);
                })
                .catch((err) => {
                    res.status(400).send(`Error retrieving inventories ${err}`)
                });
            } else {
                res.status(404).send(`The ID does not exist`);              
            }
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving item ${err}`)
        });
}

