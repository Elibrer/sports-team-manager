const router = require('express').Router();

const playerRoutes = require('./playerRoutes');
const userRoutes = require('./userRoutes');
// const teamRoutes = require('./teamRoutes');

router.use('/players', playerRoutes);
router.use('/users', userRoutes);
// router.use('/teams', teamRoutes);

module.exports = router;
