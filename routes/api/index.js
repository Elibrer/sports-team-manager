const router = require('express').Router();

const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');

router.use('/users', userRoutes);
route.use('/teams', teamRoutes);

module.exports = router;
