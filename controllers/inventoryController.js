const knex = require('knex')(require('../knexfile'));

exports.getAll = (_req, res) => {
    knex('inventories')
        .select('id', 'warehouse_id', 'item_name', 'description', 'category', 'status', 'quantity')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error retrieving inventories ${err}`))
}