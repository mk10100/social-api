const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
