module.exports = (app) => {
  // const tutorials = require("../controllers/tutorial.controller.js");
  const Admin = require("../controllers/admin/admin.js");
  const Anggota = require("../controllers/anggota/anggota.js");
  const Register = require("../controllers/Auth/register.js");
  const Login = require("../controllers/Auth/login.js");
  const profile = require("../controllers/profile/profile.js");
  const general = require("../controllers/general/general.js");
  const token = require("../../app/config/tokenHandler.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/login", Login.login);
  router.post("/register", Register.register);
  router.get("/cheklogin", token.authenticateToken, Login.cheklogin);
  //Admin
  router.get("/list-admin", token.authenticateToken, Admin.listAdmin);
  router.post("/create-admin", token.authenticateToken, Admin.createAdmin);
  router.post("/update-admin", token.authenticateToken, Admin.updateAdmin);
  router.post("/delete-admin", token.authenticateToken, Admin.delete);
  //Anggota
  router.get("/list-anggota", token.authenticateToken, Anggota.listAnggota);
  router.post("/create-anggota", token.authenticateToken, Anggota.createAnggota);
  router.post("/update-anggota", token.authenticateToken, Anggota.updateAnggota);

  //Identity
  router.get("/get-identity-types", token.authenticateToken, general.getIdentityTypes);


  // Retrieve all Tutorials
  router.get("/users/findAll", token.authenticateToken, profile.findAll);
  router.get("/general/getRoleAdmin", token.authenticateToken, general.roleAdmin);
  router.post("/general/getRoleNoDeve", token.authenticateToken, general.getRoleNoDeve);
  router.post("/general/getCompany", token.authenticateToken, general.getCompany);
  router.get("/general/getStatus", token.authenticateToken, general.getstatus);
  router.get("/general/getReligion", token.authenticateToken, general.getReligion);
  router.get("/general/getMaritalStatus", token.authenticateToken, general.getMaritalStatus);
  router.post(
    "/general/findUsersByUid",
    token.authenticateToken,
    general.findUsersByUid
  );
  router.get("/faker/generate", general.generate);

  app.use("/api", router);
};
