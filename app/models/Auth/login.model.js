const DB = require("../../models/db");
const {generateToken, verifyToken} = require("../../config/tokenHandler")

// constructor
const Login = function (data) {
  this.email = data.email;
  this.password = data.password;
};

Login.loginAction = async (req, res) => {
  try {
    const { user, password } = req.body;
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(422).json({
        status: 422,
        message: "Incorrect password!",
      });
    }
    console.log(verifyPassword);
    // Generating Access and Refresh Token
    const access_token = generateToken({ id: user.id });
    const refresh_token = generateToken({ id: user.id }, false);

    const md5Refresh = createHash("md5").update(refresh_token).digest("hex");

    // Storing refresh token in MD5 format
    const [result] = await DB.execute(
      "INSERT INTO `refresh_tokens` (`tokenable_type`,`tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`) VALUES (?,?)",
      [user.id, md5Refresh]
    );

    if (!result.affectedRows) {
      throw new Error("Failed to whitelist the refresh token.");
    }
    res.json({
      status: 200,
      access_token,
      refresh_token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = Login;
