const router = require('express').Router();

const playerRoutes = require('./playerRoutes');
const userRoutes = require('./userRoutes');

const adminRoutes = require("./adminRoutes");
const teamRoutes = require('./teamRoutes');

const positionRoutes = require('./positionRoutes');

router.use('/players', playerRoutes);
router.use('/users', userRoutes);

router.use('/admin', adminRoutes);
router.use('/teams', teamRoutes);

router.use('/positions', positionRoutes);


module.exports = router;
