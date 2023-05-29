const router = require('express').Router();
const { Team } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const teams = await Team.findAll();
      res.status(200).json(teams);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:name', async (req, res) => {
    try {
        const team = await Team.findOne({
            where: {
              team_name: req.params.name,
            },
          });
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const updatedTeam = await Team.update(
        {
          team_name: req.body.team_name,
          user_id: req.body.user_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(updatedTeam);
    } catch (err) {
      res.status(500).json(err);
    }
});


  module.exports = router;