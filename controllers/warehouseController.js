const knex = require('knex')(require('../knexfile'));

// GET warehouses

exports.getAll = (_req, res) => {
    knex('warehouses')
        .select('id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_phone', 'contact_email')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving Warehouses ${err}`)
        })
}