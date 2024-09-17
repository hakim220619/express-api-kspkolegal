const Role = require("../../models/general/role.model");

const db = require("../../config/db.config");
const Generate = require("../../models/general/generate.model");
const General = require("../../models/general/general.model");

// Retrieve all Tutorials from the database (with condition).
exports.roleAdmin = (req, res, next) => {
  const role_name = req.body.role_name;
  // console.log(role_name);
  Role.getRoleAdmin(role_name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
exports.getRoleNoDeve = (req, res, next) => {
  const { role_name } = req.body;

  // console.log(role_name);
  Role.getRoleNoDeve(role_name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
exports.getCompany = (req, res, next) => {
  // Extract company_id from the request body
  const { company_id } = req.body;

  // Call General.getCompany with company_id if needed
  General.getCompany(company_id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving company data.",
      });
    } else {
      res.send(data);
    }
  });
};
exports.findUsersByUid = (req, res, next) => {
  const uid = req.body.uid;
  // console.log(req);
  General.findUsersByUid(uid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
exports.getstatus = (req, res, next) => {
  // console.log(req);
  General.getstatus((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
exports.getReligion = (req, res, next) => {
  // console.log(req);
  General.getReligion((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
exports.getWorking = (req, res, next) => {
  // console.log(req);
  General.getWorking((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
exports.getMaritalStatus = (req, res, next) => {
  // console.log(req);
  General.getMaritalStatus((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
exports.getIdentityTypes = (req, res, next) => {
  // console.log(req);
  General.getIdentityTypes((err, data) => {
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
