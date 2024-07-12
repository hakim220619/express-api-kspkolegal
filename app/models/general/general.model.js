const db = require("../../config/db.config");
const General = function (data) {};

General.findUsersByUid = async (uid, result) => {
  let query =
    "SELECT u.id, u.uid, u.nik, u.nta, u.member_number, u.fullName, u.email, u.date, u.address, u.phone_number, u.state, u.password, u.role, r.role_name FROM users u, role r WHERE u.role=r.id and u.uid = '" +
    uid +
    "'";

//   console.log(uid);
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //   console.log("users: ", res);
    result(null, res[0]);
  });
};

module.exports = General;
