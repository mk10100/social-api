const { User, Thought, Reaction } = require("../models");

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = await Thought.create({ thoughtText, username, userId });
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { thoughts: thought._id },
        },
        { new: true }
      );
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } }
      );

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      // res.json(req.params.reactionId);
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      // const thought = await Thought.findById(req.params.thoughtId);
      // thought.reactions.pull({ _id: req.params.reactionId });
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
