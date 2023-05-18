const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Player, User } = require('../../models');


// GET all users
router.get('/', async (req, res) => {
    try {   
        const userData = await User.findAll();

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// CREATE new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;
