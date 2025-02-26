const express = require("express");
const {
  createUser,
  login,
  getAllUser,
  getAllProtectedUser,
  updateUser,
  getUserDetail,
} = require("../controller/user");
const { userProtected } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(createUser);
router.route("/login").post(login);
router.route("/").get(getAllUser);
router.route("/protect/all").get(userProtected, getAllProtectedUser);
router.route("/:id").put(updateUser).get(getUserDetail);
module.exports = router;
