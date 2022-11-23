const knex = require('knex')(require('../knexfile'));

exports.getAll = (req, res) => {
    knex('inventories')
        .join('warehouses', 'warehouses.id', 'inventories.warehouse_id')
        .select('inventories.id', 'warehouses.warehouse_name', 'inventories.warehouse_id', 'inventories.item_name', 'inventories.description', 'inventories.category', 'inventories.status', 'inventories.quantity')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error retrieving inventories ${err}`))
}