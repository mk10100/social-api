// Import required modules
const { User, Thought } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single user by its _id and populated thought and friend data
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a user by its _id
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove user by its _id
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      // Remove user's associated thoughts
      await Thought.deleteMany({ username: deletedUser.username });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to add a new friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.push(req.params.friendId);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a friend from a user's friend list
  removeFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.pull(req.params.friendId);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

// Export userController object
module.exports = userController;
