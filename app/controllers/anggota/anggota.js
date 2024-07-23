const Anggota = require("../../models/anggota/anggota.model.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
// Retrieve all Tutorials from the database (with condition).
exports.listAnggota = (req, res, next) => {
  const fullName = req.query.q;
  const company = req.query.company;
  Anggota.getAll(fullName, company, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.createAnggota = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const anggota = new Anggota({
    uid: uuidv4(),
    member_number: randomNumber(10000, 9999999),
    nik: req.body.data.nik,
    company_id: req.body.data.company_id,
    fullName: req.body.data.fullName,
    email: req.body.data.email,
    dob: req.body.data.dob.slice(0, 10),
    address: req.body.data.address,
    phone_number: req.body.data.phone_number,
    password: await bcrypt.hash(req.body.data.password, 10),
    role: 4,
    created_by: req.body.data.created_by,
    state: "Active",
    created_at: new Date(),
  });
  // console.log(Anggota);
  // Save Tutorial in the database
  Anggota.create(anggota, (err, data) => {
    // console.log(err);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

exports.updateAnggota = async (req, res) => {
  // console.log(req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const anggota = new Anggota({
    uid: req.body.data.uid,
    nik: req.body.data.nik,
    fullName: req.body.data.fullName,
    email: req.body.data.email,
    dob: req.body.data.dateOfBirth,
    address: req.body.data.address,
    phone_number: req.body.data.phone_number,
    role: req.body.data.role,
    company_id: req.body.data.company_id,
    state: req.body.data.state,
    updated_by: req.body.data.updated_by,
    updated_at: new Date(),
  });
  // Save Tutorial in the database
  Anggota.update(anggota, (err, data) => {
    // console.log(err);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res, next) => {
  // console.log(req);
  const uid = req.body.data;
  // console.log(req.body);
  Anggota.delete(uid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
