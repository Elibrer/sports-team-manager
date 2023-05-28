const { Player } = require('../models');

const playerData = [
  {
    first_name: 'Bob',
    last_name: 'Smith',
    player_number: 15,
    scores: 3,
    fouls: 1,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: 'Hugo',
    last_name: 'Dub',
    player_number: 8,
    scores: 9,
    fouls: 1,
    position_id: 2,
    team_id: 2
  },
  ];

const seedPlayer = () => Player.bulkCreate(playerData);

module.exports = seedPlayer;