const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = thoughtController;

// api/thoughts

router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);

router.post('/', createThought);
router.post('/:thoughtId/reactions', createReaction);

router.put('/:thoughtId', updateThought);

router.delete('/:thoughtId', deleteThought);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
