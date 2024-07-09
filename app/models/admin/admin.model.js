const db = require("../../config/db.config");
const bcrypt = require("bcrypt");
// constructor
const Admin = function (data) {
  // console.log(data);
  this.uid = data.uid;
  this.company_id = data.company_id;
  this.nik = data.nik;
  this.member_number = 'KSP'+ data.member_number;
  this.email = data.email;
  this.fullName = data.fullName;
  this.date = data.dob;
  this.address = data.address;
  this.phone_number = data.phone_number;
  this.role = data.role;
  this.password = data.password;
  this.state = 'Active';
  this.created_at = new Date();
};

Admin.create = (newUsers, result) => {
  // console.log(newUsers);
  db.query("INSERT INTO users SET ?", newUsers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Admin: ", { id: res.insertId, ...newUsers });
    result(null, { id: res.insertId, ...newUsers });
  });
};

// Tutorial.findById = (id, result) => {
//   sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Admin.getAll = (fullName, role, status, result) => {
  let query = "SELECT ROW_NUMBER() OVER () AS no, u.id, u.company_id, u.uid, u.nik, u.nta, u.member_number, u.fullName, u.email, u.date, u.address, u.phone_number, u.state, u.password, r.role_name as role FROM users u, role r WHERE u.role=r.id and r.role_name not in ('Anggota', 'Pegawai')";

  if (fullName) {
    query += ` AND u.fullName like '%${fullName}%'`;
  }
  if (role) {
    query += ` AND r.role_name = '${role}'`;
  }
  if (status) {
    query += ` AND u.state = '${status}'`;
  }
  // if (page) {
  //   query += `LIMIT ${page},${pageSize}`
  // }
  

  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // console.log("users: ", res);
    result(null, res);
  });
};

module.exports = Admin;
