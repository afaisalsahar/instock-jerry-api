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

// DELETE Warehouse
exports.deleteWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      !data.length
        ? res.status(404).send("Warehouse ID is not found")
        : knex("warehouses")
            .del()
            .where({ id: req.params.id })
            .then(() => {
              res.sendStatus(204);
            })
            .catch((error) => {
              res.status(400).send(`Invalid warehouse: ${error}`);
            });
    })
    .catch((error) => {
      res.status(404).send(`Invalid warehouse ID: ${error}`);
    });
};

// Get single warehouse details
exports.getSingleWarehouse = (req, res) => {
  const { id } = req.params;

  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      if (data.length === 0)
        return res
          .status(400)
          .json({ message: `Warehouse ${id} does not exist` });

      return res.status(200).json(data[0]);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
        )
    );
};

// Update Warehouse Details

exports.updateWarehouse = (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide necessary info"
      );
  }

  knex("warehouses")
    .where({ id: req.params.id })
    .then((response) => {
      if (response.length !== 0) {
        const editedWarehouse = {
          warehouse_name: req.body.warehouse_name,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          contact_name: req.body.contact_name,
          contact_position: req.body.contact_position,
          contact_phone: req.body.contact_phone,
          contact_email: req.body.contact_email,
        };

        knex("warehouses")
        .where({ id: req.params.id })
        .update(editedWarehouse)
        .then(() => {
          //response returns status 200 when successful
          res.status(200).json(editedWarehouse);
        })
        .catch((err) => {
          res.status(400).send(`Error retrieving warehouse ${err}`);
        });
      } else {
        res.status(404).send(`The ID does not exist`);
      }
    })
        .catch((err) => {
        res.status(400).send(`Error retrieving Warehouse ${err}`);
    });
  }
