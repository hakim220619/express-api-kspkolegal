const Admin = require("../../models/admin/admin.model.js");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
// Retrieve all Tutorials from the database (with condition).
exports.listAdmin = (req, res, next) => {
const fullName = req.query.q;
const role = req.query.role;
const status = req.query.status;
const page = req.query.pagination.page;
const pageSize = req.query.pagination.pageSize;
  Admin.getAll(fullName, role, status, page, pageSize, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.createAdmin = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  const admin = new Admin({
    uid: uuidv4(),
    member_number: randomNumber(10000, 9999999),
    nik: req.body.data.nik,
    company_id: req.body.data.company_id,
    fullName: req.body.data.fullName,
    email: req.body.data.email,
    dob: req.body.data.dob.slice(0, 10),
    address: req.body.data.address,
    phone_number: req.body.data.phone_number,
    password:  await bcrypt.hash(req.body.data.password, 10),
    role: req.body.role
  });
  // console.log(admin);
  // Save Tutorial in the database
  Admin.create(admin, (err, data) => {
    // console.log(err);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};


