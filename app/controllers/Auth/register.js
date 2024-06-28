const Register = require("../../models/Auth/register.model");

// Create and Save a new Tutorial
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Tutorial
  const users = new Register({
    uid: req.body.uid,
    nik: req.body.nik,
    nta: req.body.nta,
    member_number: req.body.member_number,
    full_name: req.body.full_name,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    address: req.body.address,
    phone_number: req.body.phone_number,
  });

  // Save Tutorial in the database
  Register.create(users, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Registers.",
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const full_name = req.query.full_name;

  Users.getAll(full_name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

