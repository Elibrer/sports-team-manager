const { Team } = require('../models');

const teamData = [
  {
    team_name: 'A',
    user_id: 1,
  },
  {
   team_name: 'B',
   user_id: 2,
  },
  {
    team_name: 'C',
    user_id: 3,
   },
   {
    team_name: 'D',
    user_id: 4,
   },
   {
    team_name: 'E',
    user_id: 5,
   },
  ];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;