const router = require('express').Router();
const { Player } = require('../../models/');

// Get all players
router.get('/players', async (req, res) => {
    try {
        const players = await Player.findAll();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single player by ID
router.get('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (!player) {
            res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new player
router.post('/players', async (req, res) => {
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

// Instance methods
Player.prototype.hasScores = function () {
    return this.scores > 0;
};

Player.prototype.hasFouls = function () {
    return this.fouls > 0;
};

module.exports = router;