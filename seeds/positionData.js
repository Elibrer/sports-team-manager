const { Position } = require('../models');

const teamPosition = [
  {
    position_name: 'Attacker',
  },
  {
   position_name: 'Defender',
  },

  ];

const seedPosition = () => Position.bulkCreate(teamPosition);

module.exports = seedPosition;