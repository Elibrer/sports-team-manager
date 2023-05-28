const { Position } = require('../models');

const teamPosition = [
  {
    position_name: 'Attack',
  },
  {
   position_name: 'Defence',
  },

  ];

const seedPosition = () => Position.bulkCreate(teamPosition);

module.exports = seedPosition;