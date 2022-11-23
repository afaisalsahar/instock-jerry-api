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

// DELETE inventory item
exports.deleteItem = (req, res) => {
    // READ inventory item to validate it exists
    knex('inventories')
    .where({id: req.params.id})
    .then((data) => {
        // item doesn't exist? empty array is returned
        !data.length ? 
            res.status(404).send('Inventory ID is not found') : // 404 not found status
            
            // item exists? DELETE invenotry item 
            knex('inventories')
            .del()
            .where({id: req.params.id})
            
            .then(() => {
                res.sendStatus(204); // 204 No Content success status response
            })
            
            .catch((error) => {
                res.status(400).send(`Invalid inventory item: ${error}`); // 400 Bad Request response status 
            });

    })
    .catch((error) => {
        res.status(404).send(`Invalid inventory ID: ${error}`); // 404 not found status
    })
}
