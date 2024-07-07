const db = require("../../config/db.config");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Generate = function (data) {};
Generate.create = async (result) => {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const users = [];

  for (let i = 0; i < 5000; i++) {
    users.push([
      1,
      uuidv4(),
      "KSP" + randomNumber(1000, 9999999),
      randomNumber(10000, 9999999),
      faker.name.findName(),
      faker.internet.email(),
      faker.address.streetAddress(),
      await bcrypt.hash("12345678", 10),
      "2024-03-03",
      "4253452352342",
      "Verification",
      new Date(),
      2
    ]);
  }
  //   console.log(fakeData);
  const query =
    "INSERT INTO users (company_id, uid, nik, member_number, fullName, email, address, password, date,phone_number, state, created_at, role ) VALUES ?";
  db.query(query, [users], (err, results) => {
    result(null, results);
  });
};

module.exports = Generate;
