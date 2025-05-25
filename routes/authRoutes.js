const express = require("express");
const { createUser, loginUser } = require("../controllers/authControllers");
const verifyToken = require("../middlewears/verifyToken");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/verifyUser", verifyToken, (req, res) => {
  console.log(req.decoded);
  res.status(200).json({ message: "User is verified!", user: req.decoded });
});
module.exports = router;
