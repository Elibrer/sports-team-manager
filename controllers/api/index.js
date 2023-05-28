const router = require('express').Router();

const playerRoutes = require('./playerRoutes');
const userRoutes = require('./userRoutes');

const adminRoutes = require("./adminRoutes");

router.use('/players', playerRoutes);
router.use('/users', userRoutes);
router.use("/admin", adminRoutes);


module.exports = router;
