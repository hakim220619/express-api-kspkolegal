const Login = require("../../models/Auth/login.model");
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const users = new Login({
    email: req.body.email,
    password: req.body.password,
  });
  //   const user = { id: 1, username: "exampleuser" };

  // Save Tutorial in the database
  Login.loginAction(users, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
