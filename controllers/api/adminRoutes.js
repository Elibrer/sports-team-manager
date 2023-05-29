const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/users/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an existing user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.update({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (!updatedUser[0]) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;