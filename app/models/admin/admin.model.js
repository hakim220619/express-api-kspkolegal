const db = require("../../config/db.config");
const bcrypt = require("bcrypt");
// constructor
const Admin = function (data) {
  console.log(data);
  this.uid = data.uid;
  this.company_id = data.company_id;
  this.nik = data.nik;
  if (data.member_number != undefined) {
    this.member_number = "KSP" + data.member_number;
  }
  
  this.email = data.email;
  this.fullName = data.fullName;
  this.date = data.dob;
  this.address = data.address;
  this.phone_number = data.phone_number;
  this.role = data.role;
  if (data.password != undefined) {
    this.password = data.password;
  }
 
  this.state = data.state;
  if (data.created_at != undefined) {
    this.created_at = data.created_at;
  }
  if (data.created_by != undefined) {
    this.created_by = data.created_by;
  }
  if (data.updated_by != undefined) {
    this.updated_by = data.updated_by;
  }
  if (data.updated_at != undefined) {
    this.updated_at = data.updated_at;
  }
  
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

Admin.update = (newUsers, result) => {
  if (newUsers.password) {
    bcrypt.hash(newUsers.password, 10, (err, hash) => {
      if (err) {
        console.error("Error hashing password: ", err);
        result(err, null);
        return;
      }
      newUsers.password = hash;

      // Update user with hashed password
      performUpdate(newUsers, result); 
    });
  } else {
    // Update user without password change
    performUpdate(newUsers, result);
  }
};
const performUpdate = (newUsers, result) => {
  console.log(newUsers);
  db.query(
    "UPDATE users SET ? WHERE uid = ?",
    [newUsers, newUsers.uid],
    (err, res) => {
      console.log(res);
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("Updated User: ", { id: newUsers.uid, ...newUsers });
      result(null, { id: newUsers.uid, ...newUsers });
    }
  );
};

Admin.getAll = (fullName, role, status, result) => {
  let query =
    "SELECT ROW_NUMBER() OVER () AS no, u.id, u.company_id, u.uid, u.nik, u.nta, u.member_number, u.fullName, u.email, u.date, u.address, u.phone_number, u.state, u.password, r.role_name as role FROM users u, role r WHERE u.role=r.id and r.role_name not in ('Anggota', 'Pegawai')";

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
Admin.delete = (uid, result) => {
  let query = `DELETE FROM users WHERE uid = '${uid}'`;

  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(`Deleted user with ID ${uid}`);
    result(null, res);
  });
};

module.exports = Admin;
