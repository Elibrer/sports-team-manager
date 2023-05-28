const router = require('express').Router();
const { User, Player } = require('../../models');

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

// Create a new player
router.post('/players/', async (req, res) => {
    try {
        const newPlayer = await Player.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            player_number: req.body.player_number,
            scores: req.body.scores,
            fouls: req.body.fouls,
        });
        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an existing player by ID
router.put('/players/:id', async (req, res) => {
    try {
        const updatedPlayer = await Player.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            player_number: req.body.player_number,
            scores: req.body.scores,
            fouls: req.body.fouls,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (!updatedPlayer[0]) {
            res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json({ message: 'Player updated successfully' });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a player by ID
router.delete('/players/:id', async (req, res) => {
    try {
        const deletedPlayer = await Player.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedPlayer) {
            res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json({ message: 'Player deleted successfully' });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;