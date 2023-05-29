const router = require('express').Router();
const { Position } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const teams = await Position.findAll();
      res.status(200).json(teams);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:name', async (req, res) => {
    try {
        const team = await Position.findOne({
            where: {
              position_name: req.params.name,
            },
            
          });
        if (!team) {
            res.status(404).json({ message: 'Position not found' });
        }
        res.status(200).json(team);

    } catch (err) {
        res.status(500).json(err);
    }
});

  module.exports = router;