const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = userController;
// api/users
router.get("/", getAllUsers);
router.get("/:userId", getUserById);

router.post("/", createUser);
router.post("/:userId/friends/:friendId", addFriend);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);
router.delete("/:userId/friends/:friendId", removeFriend);

module.exports = router;
