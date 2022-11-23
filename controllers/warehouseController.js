const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');

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

// CREATE new warehouse
exports.addNew = (req, res) => {
    
    const body = req.body;

    /* 
        phone validation regex passes following formats:
        (123) 456-7890 || 123 456 7890 || +1 (123) 456-7890 

        email validation regex passes:
        letters and nums @ letters nums . max {three letters}
    */

    const validation =
        body.warehouse_name &&
        body.address &&
        body.city &&
        body.country &&
        body.contact_name &&
        body.contact_position &&
        /^(\+\d{1}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(body.contact_phone) &&
        /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(body.contact_email);

    
    if (!validation) {
        return res.status(400) // 400 Bad Request response status 
        .send('Please make sure to provide name, manager, address, phone and email fields in a request');
    }

    // add unique ID to new warehouse record
    const newWarehouse = {
        id: uuid(),
        ...body
    };

    // CREATE new warehouse record
    knex('warehouses')
        .insert(newWarehouse)
        .then((_data) => {
            // READ newly created warehouse record
            return knex('warehouses').where({id: newWarehouse.id})
        })
        .then((data) => {
            // return newly created warehouse 
            res.status(201).send(data[0]); // 201 Created success status 
        })
        .catch((err) => {
            res.status(400).send(`Error creating Warehouse: ${err}`); // 400 Bad Request response status
        })
}