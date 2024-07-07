const db = require("../../config/db.config");

const Role = function (data) {
  this.role_name = data.role_name;
};
Role.getRole = (role_name, result) => {
  let query = "SELECT * FROM role where 1=1 ";

  if (role_name) {
    query += ` and role_name LIKE '%${role_name}%'`;
  }

  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("role: ", res);
    result(null, res);
  });
};

module.exports = Role;
