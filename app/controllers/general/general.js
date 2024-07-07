const Role = require("../../models/general/role.model");

const db = require("../../config/db.config");
const Generate = require("../../models/general/generate.model");

// Retrieve all Tutorials from the database (with condition).
exports.role = (req, res, next) => {
  const role_name = req.body.role_name;
  // console.log(role_name);
  Role.getRole(role_name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.generate = (req, res) => {
    Generate.create((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials.",
          });
        else res.send(data);
      });
};