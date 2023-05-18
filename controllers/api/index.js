const router = require('express').Router();
const playerRoutes = require('./playerRoutes');
const userRoutes = require('./userRoutes');

router.use('/players', playerRoutes);
router.use('/users', userRoutes);

module.exports = router;
