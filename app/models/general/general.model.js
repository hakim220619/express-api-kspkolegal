const db = require("../../config/db.config");
const General = function (data) {};

General.findUsersByUid = async (uid, result) => {
  let query =
    "SELECT u.id, u.company_id, c.company_name, u.uid, u.nik,  u.member_id, u.fullName, u.email, u.date_of_birth, u.address, u.phone_number, u.status, u.password, u.role, r.role_name, u.marital_status, u.place_of_birth, u.no_identity, u.gender, u.identity_type FROM users u, role r, company c WHERE u.role=r.id and u.company_id=c.id and u.uid = '" +
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
General.getstatus = async (result) => {
  let query = "SELECT * from status where active = 'ON'";
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
General.getReligion = async (result) => {
  let query = "SELECT * from religion where religion_status = 'ON'";
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
General.getMaritalStatus = async (result) => {
  let query = "SELECT * from marital_status where ms_status = 'ON'";
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
General.getIdentityTypes = async (result) => {
  let query = "SELECT * from identity_type where idt_status = 'ON'";
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
General.getCompany = async (company_id, result) => {
  // Construct the query based on whether company_id is provided
  let query = "SELECT * FROM company WHERE company_status = 'ON'";
  const queryParams = [];

  if (company_id != '1') {
    query += " AND id = ?";
    queryParams.push(company_id);
  }

  // Execute the query with or without the company_id filter
  db.query(query, queryParams, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // Return the result
    result(null, res);
  });
};


module.exports = General;
