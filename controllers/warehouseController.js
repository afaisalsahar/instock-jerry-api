const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

// GET warehouses

exports.getAll = (_req, res) => {
  knex("warehouses")
    .select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_phone",
      "contact_email"
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving Warehouses ${err}`);
    });
};

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
    /^(\+\d{1}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(
      body.contact_phone
    ) &&
    /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(body.contact_email);

  if (!validation) {
    return res
      .status(400) // 400 Bad Request response status
      .send(
        "Please make sure to provide name, manager, address, phone and email fields in a request"
      );
  }

  // add unique ID to new warehouse record
  const newWarehouse = {
    id: uuid(),
    ...body,
  };

  // CREATE new warehouse record
  knex("warehouses")
    .insert(newWarehouse)
    .then((_data) => {
      // READ newly created warehouse record
      return knex("warehouses").where({ id: newWarehouse.id });
    })
    .then((data) => {
      // return newly created warehouse
      res.status(201).send(data[0]); // 201 Created success status
    })
    .catch((err) => {
      res.status(400).send(`Error creating Warehouse: ${err}`); // 400 Bad Request response status
    });
};

// Get warehouse inventories
exports.warehouseInventories = (req, res) => {
    knex('inventories')
      .select("id", "warehouse_id", "item_name", "description", "category", "status", "quantity")  
      .where({ warehouse_id: req.params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res
          .status(400)
          .send(
            `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
          )
      );
  };

// DELETE Warehouse
  exports.deleteWarehouse = (req, res) => {
    knex('warehouses')
    .where({id: req.params.id})
    .then((data) => {
        !data.length ? 
        res.status(404).send('Warehouse ID is not found') :
        knex('warehouses')
        .del()
        .where({id: req.params.id})
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            res.status(400).send(`Invalid warehouse: ${error}`);
        });
    })
    .catch((error) => {
        res.status(404).send(`Invalid warehouse ID: ${error}`);
    })
}
  knex("inventories")
    .select(
      "id",
      "warehouse_id",
      "item_name",
      "description",
      "category",
      "status",
      "quantity"
    )
    .where({ warehouse_id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
        )
    );
};

// Get single warehouse details
exports.getSingleWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
        )
    );
};
