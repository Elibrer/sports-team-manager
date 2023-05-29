const { Team } = require('../models');

const teamData = [
  {
    team_name: 'West Sydney Tigers',
    user_id: 1,
  },
  {
    team_name: 'Macquarie Uni',
    user_id: 2,
  },
  {
    team_name: 'Randwick Saints',
    user_id: 3,
  },
  {
    team_name: 'Miranada Bombers',
    user_id: 4,
   }
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;